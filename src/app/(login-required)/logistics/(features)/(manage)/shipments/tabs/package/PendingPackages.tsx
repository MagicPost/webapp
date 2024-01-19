'use client';

import TableTemplate from '../../tables/TableTemplate';
import { getColumns } from '../../tables/package-columns';
import { BatchStates, BranchTypes, PackageStates, PackageTrackingActions } from '@/constants';
import { Button } from '@/components/ui/button';
import { ETabValue } from '../../@types/tab';
import { useBatches, useBranch, usePackages } from '../../context';
import { Row } from '@tanstack/react-table';
import { GetPackageDTO } from '@/dtos/package/package.dto';
import { useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import toast from 'react-hot-toast';
import { CreateBatchDTO } from '@/dtos/batch/batch.dto';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import CustomAlert from '@/components/main/CustomAlert';
import { createNewBatch } from '@/actions/batch/createNewBatch';
import { updateBatch } from '@/actions/batch/updateBatch';
import { addPackageTrackingAction } from '@/actions/package/addPackageTrackingAction';

export default function PendingPackages() {
  const columns = getColumns({
    include: {
      select: true,
      nextBranch: true,
    },
  });

  const { branch } = useBranch();
  const { packagesMap } = usePackages();
  const pendingPackages = packagesMap?.[ETabValue.PENDING_PACKAGE] || [];

  return (
    <div>
      <TableTemplate
        tableProps={{
          columns,
          data: pendingPackages,
        }}
        include={{
          select: true,
        }}
        produceCustomComponent={({ table }) => {
          const selectedRows = table.getFilteredSelectedRowModel().rows;
          const canTransfer = selectedRows.every(
            (row) => row.original.state === PackageStates.PENDING__READY_TO_TRANSER
          );
          const canDeliver = selectedRows.every(
            (row) => row.original.state === PackageStates.PENDING__READY_TO_DELIVER
          );

          return (
            <div className='flex flex-col justify-end gap-2 sm:flex-row'>
              <CreateBatchDialog
                canTransfer={canTransfer}
                selectedRows={selectedRows}
                pendingPackages={pendingPackages}
                toggleAllRowsSelected={table.toggleAllRowsSelected}
              />

              {branch?.type === BranchTypes.TRANSACTION_POINT && (
                <DeliverDialog
                  pendingPackages={pendingPackages}
                  canDeliver={canDeliver}
                  selectedRows={selectedRows}
                  toggleAllRowsSelected={table.toggleAllRowsSelected}
                />
              )}
            </div>
          );
        }}
      />
    </div>
  );
}

function CreateBatchDialog({
  canTransfer,
  selectedRows,
  pendingPackages,
  toggleAllRowsSelected,
}: {
  canTransfer: boolean;
  selectedRows: Row<GetPackageDTO>[];
  pendingPackages: GetPackageDTO[];
  toggleAllRowsSelected: (value?: boolean) => void;
}) {
  const { branch } = useBranch();
  const { packagesMap, setPackagesMap } = usePackages();
  const { batchesMap, setBatchesMap } = useBatches();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [batchId, setBatchId] = useState('');
  const [truckCode, setTruckCode] = useState('');

  const branchCode =
    branch && branch.name.replace(/Điểm giao dịch |Điểm tập kết /, '').split(' ')[0];

  const hasSameNextBranch = useMemo(() => {
    const nextBranches = selectedRows.map((row) => {
      const nextBranch = row.original.tracking.find((log) => log.actions.length === 0);
      return nextBranch?.branch.ref;
    });
    return nextBranches.every((branch) => branch === nextBranches[0]);
  }, [selectedRows]);

  const onCreateBatch = async () => {
    const updatedPendingPackages = pendingPackages.filter(
      (item) => !selectedRows.some((row) => row.original._id === item._id)
    );

    const nextBranch = selectedRows[0].original.tracking.find((log) => log.actions.length === 0)
      ?.branch;

    setLoading(true);

    if (batchId === 'new') {
      const payload: CreateBatchDTO = {
        truckCode,
        packages: selectedRows.map((row) => row.original._id),
        from: {
          type: branch?.type!,
          ref: branch?._id || '',
          name: branch?.name || '',
        },
        to: {
          type: nextBranch?.type!,
          ref: nextBranch?.ref || '',
          name: nextBranch?.name || '',
        },
        state: BatchStates.PENDING,
      };
      const newBatch = (await createNewBatch(payload))?.data;

      const updatedPendingBatches = [...(batchesMap[ETabValue.PENDING_BATCH] || []), newBatch];
      setBatchesMap({
        ...batchesMap,
        [ETabValue.PENDING_BATCH]: updatedPendingBatches,
      });
    } else {
      const updatingPromise = batchesMap[ETabValue.PENDING_BATCH]?.map(async (batch) => {
        if (batch._id === batchId) {
          await updateBatch(batchId, {
            $push: {
              packages: selectedRows.map((row) => row.original),
            },
          });
          return {
            ...batch,
            packages: [...batch.packages, ...selectedRows.map((row) => row.original._id)],
          };
        }
        return batch;
      });

      if (!updatingPromise) throw new Error('No batch to update');

      const updatedPendingBatches = await Promise.all(updatingPromise);

      setBatchesMap({
        ...batchesMap,
        [ETabValue.PENDING_BATCH]: updatedPendingBatches,
      });
    }

    setPackagesMap({
      ...packagesMap,
      [ETabValue.PENDING_PACKAGE]: updatedPendingPackages,
    });
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      toggleAllRowsSelected(false);
      toast.success('Thêm vào lô hàng thành công');
    }, 200);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (selectedRows.length !== 0) {
          setOpen(open);
          if (!open) {
            setBatchId('');
            setTruckCode('');
          }
        }
      }}
      defaultOpen={false}
    >
      <DialogTrigger asChild>
        <Button variant='default' disabled={!canTransfer || selectedRows.length === 0 || loading}>
          Thêm lô hàng chuyển tiếp
        </Button>
      </DialogTrigger>
      <DialogContent className='flex flex-col items-center justify-center space-y-2'>
        <DialogHeader className='text-lg font-semibold'>Thêm vào lô hàng chuyển tiếp</DialogHeader>

        {!hasSameNextBranch && (
          <CustomAlert
            variant='destructive'
            title='Các đơn hàng đã chọn không cùng điểm đến tiếp theo'
          />
        )}

        <div className='space-y-2'>
          <div className='flex flex-row items-center justify-center gap-4'>
            <Label className='w-[6rem] text-right'>Chọn lô hàng:</Label>
            <Select
              onValueChange={(value) => {
                setBatchId(value);
                if (value !== 'new') setTruckCode('');
              }}
            >
              <SelectTrigger className='w-[6rem] sm:w-[12rem]'>
                <SelectValue placeholder='Chọn hoặc tạo mới' />
              </SelectTrigger>
              <SelectContent side='right'>
                <SelectItem value='new'>Tạo lô hàng mới</SelectItem>
                {batchesMap[ETabValue.PENDING_BATCH]?.map((batch, index) => (
                  <SelectItem key={index} value={batch._id}>
                    {batch._id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {batchId === 'new' && (
            <div className='flex flex-row items-center justify-center gap-4'>
              <Label className='w-[6rem] text-right'>Chọn xe tải:</Label>
              <Select onValueChange={(value) => setTruckCode(value)}>
                <SelectTrigger className='w-[6rem] sm:w-[12rem]'>
                  <SelectValue placeholder='Chọn xe' />
                </SelectTrigger>
                <SelectContent side='right'>
                  <SelectItem value={`${branchCode}-1`}>Xe {branchCode}-1</SelectItem>
                  <SelectItem value={`${branchCode}-2`}>Xe {branchCode}-2</SelectItem>
                  <SelectItem value={`${branchCode}-3`}>Xe {branchCode}-3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <DialogFooter className='flex space-x-2'>
          <Button
            variant={'default'}
            disabled={
              !canTransfer ||
              selectedRows.length === 0 ||
              loading ||
              !batchId ||
              (batchId === 'new' && !truckCode) ||
              !hasSameNextBranch
            }
            onClick={() => {
              if (!canTransfer || selectedRows.length === 0) return;
              onCreateBatch();
            }}
            className='space-x-1.5'
          >
            {loading && <Loader2 className='h-4 w-4 animate-spin' />} <span>Thêm lô hàng</span>
          </Button>
          <Button variant={'outline'} onClick={() => setOpen(false)} className='w-24'>
            Hủy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DeliverDialog({
  pendingPackages,
  canDeliver,
  selectedRows,
  toggleAllRowsSelected,
}: {
  pendingPackages: GetPackageDTO[];
  canDeliver: boolean;
  selectedRows: Row<GetPackageDTO>[];
  toggleAllRowsSelected: (value?: boolean) => void;
}) {
  const { branch } = useBranch();
  const { packagesMap, setPackagesMap } = usePackages();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDeliver = async () => {
    const updatedPendingPackages = pendingPackages.filter(
      (item) => !selectedRows.some((row) => row.original._id === item._id)
    );

    const updatedResults = await Promise.all(
      selectedRows.map((row) =>
        addPackageTrackingAction({
          _id: row.original._id,
          branchId: branch?._id,
          actionType: PackageTrackingActions.DELIVERING,
        })
      )
    );

    const updatedDeliveringPackages = [
      ...packagesMap[ETabValue.DELIVERING]!,
      ...updatedResults.map((item) => item.data),
    ];

    setLoading(true);
    setPackagesMap({
      ...packagesMap,
      [ETabValue.PENDING_PACKAGE]: updatedPendingPackages,
      [ETabValue.DELIVERING]: updatedDeliveringPackages,
    });
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      toggleAllRowsSelected(false);
      toast.success('Giao hàng thành công');
    }, 1000);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => selectedRows.length !== 0 && setOpen(open)}
      defaultOpen={false}
    >
      <DialogTrigger asChild>
        <Button variant='default' disabled={!canDeliver || selectedRows.length === 0 || loading}>
          Giao hàng
        </Button>
      </DialogTrigger>
      <DialogContent className='flex flex-col space-y-2'>
        <DialogHeader className='text-lg font-semibold'>Giao hàng</DialogHeader>
        <span className='text-sm text-gray-500'>Xác nhận giao hàng cho các đơn hàng đã chọn?</span>
        <DialogFooter className='flex justify-end space-x-2'>
          <Button
            variant={'default'}
            disabled={!canDeliver || selectedRows.length === 0 || loading}
            onClick={() => {
              if (!canDeliver || selectedRows.length === 0) return;
              onDeliver();
            }}
            className='space-x-1.5'
          >
            {loading && <Loader2 className='h-4 w-4 animate-spin' />} <span>Đồng ý</span>
          </Button>
          <Button variant={'outline'} onClick={() => setOpen(false)}>
            Hủy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
