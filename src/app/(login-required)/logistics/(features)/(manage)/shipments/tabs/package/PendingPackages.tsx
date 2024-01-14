'use client';

import { GetBasicBranchDTO } from '@/dtos/branches/branch.dto';
import TableTemplate from '../../tables/TableTemplate';
import { getColumns } from '../../tables/package-columns';
import { BatchStates, BranchTypes, PackageStates } from '@/constants';
import { Button } from '@/components/ui/button';
import { ETabValue } from '../../@types/tab';
import { useBatches, useBranch, usePackages } from '../../context';
import { Row } from '@tanstack/react-table';
import { GetPackageDTO } from '@/dtos/package/package.dto';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import toast from 'react-hot-toast';
import { CreateBatchDTO, GetBatchDTO } from '@/dtos/batch/batch.dto';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export default function PendingPackages() {
  const columns = getColumns({
    include: {
      select: true,
    },
  });

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
            <div className='flex justify-end gap-2'>
              <CreateBatchDialog
                canTransfer={canTransfer}
                selectedRows={selectedRows}
                pendingPackages={pendingPackages}
                toggleAllRowsSelected={table.toggleAllRowsSelected}
              />

              <DeliverDialog
                pendingPackages={pendingPackages}
                canDeliver={canDeliver}
                selectedRows={selectedRows}
                toggleAllRowsSelected={table.toggleAllRowsSelected}
              />
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
  const [truckId, setTruckId] = useState('');

  const branchCode = branch && branch.name.replace('Điểm giao dịch ', '').split(' ')[0];

  const onCreateBatch = () => {
    const updatedPendingPackages = pendingPackages.filter(
      (item) => !selectedRows.some((row) => row.original._id === item._id)
    );

    const newBatch: CreateBatchDTO = {
      truckId,
      packages: selectedRows.map((row) => row.original),
      from: {
        type: BranchTypes.TRANSACTION_POINT,
        ref: 'from',
        name: 'Chi nhánh gửi',
      },
      to: {
        type: BranchTypes.TRANSACTION_POINT,
        ref: 'to',
        name: 'Chi nhánh nhận',
      },
      state: BatchStates.PENDING,
    };

    const updatedPendingBatches = [...(batchesMap[ETabValue.PENDING_BATCH] || []), newBatch];

    console.log(newBatch);

    setLoading(true);
    // setPackagesMap({
    //   ...packagesMap,
    //   [ETabValue.PENDING_PACKAGE]: updatedPendingPackages,
    // });
    // setBatchesMap({
    //   ...batchesMap,
    //   [ETabValue.PENDING_BATCH]: updatedPendingBatches,
    // });
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      toggleAllRowsSelected(false);
      toast.success('Thêm vào lô hàng thành công');
    }, 1000);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => selectedRows.length !== 0 && setOpen(open)}
      defaultOpen={false}
    >
      <DialogTrigger>
        <Button variant='default' disabled={!canTransfer || selectedRows.length === 0 || loading}>
          Thêm lô hàng chuyển tiếp
        </Button>
      </DialogTrigger>
      <DialogContent className='flex flex-col items-center justify-center space-y-2'>
        <DialogHeader className='text-lg font-semibold'>Thêm vào lô hàng chuyển tiếp</DialogHeader>

        <div className='space-y-2'>
          <div className='flex flex-row items-center justify-center gap-4'>
            <Label className='w-[6rem] text-right'>Chọn lô hàng:</Label>
            <Select
              onValueChange={(value) => {
                setBatchId(value);
                if (value !== 'new') setTruckId('');
              }}
            >
              <SelectTrigger className='w-[6rem] sm:w-[12rem]'>
                <SelectValue placeholder='Chọn hoặc tạo mới' />
              </SelectTrigger>
              <SelectContent side='right'>
                <SelectItem value='new'>Tạo lô hàng mới</SelectItem>
                <SelectItem value='1223'>B-32323</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {batchId === 'new' && (
            <div className='flex flex-row items-center justify-center gap-4'>
              <Label className='w-[6rem] text-right'>Chọn xe tải:</Label>
              <Select onValueChange={(value) => setTruckId(value)}>
                <SelectTrigger className='w-[6rem] sm:w-[12rem]'>
                  <SelectValue placeholder='Chọn xe' />
                </SelectTrigger>
                <SelectContent side='right'>
                  <SelectItem value='truck-1'>Xe {branchCode}-1</SelectItem>
                  <SelectItem value='truck-2'>Xe {branchCode}-2</SelectItem>
                  <SelectItem value='truck-3'>Xe {branchCode}-3</SelectItem>
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
              (batchId === 'new' && !truckId)
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
  const { packagesMap, setPackagesMap } = usePackages();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDeliver = () => {
    const updatedPendingPackages = pendingPackages.filter(
      (item) => !selectedRows.some((row) => row.original._id === item._id)
    );
    const updatedDeliveringPackages = [
      ...packagesMap[ETabValue.DELIVERING]!,
      ...selectedRows.map((row) => row.original),
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
      <DialogTrigger>
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
