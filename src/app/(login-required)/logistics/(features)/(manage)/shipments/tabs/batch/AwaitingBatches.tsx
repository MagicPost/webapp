'use client';

import TableTemplate from '../../tables/TableTemplate';
import { getColumns } from '../../tables/batch-columns';
import { useBatches, useBranch, usePackages } from '../../context';
import { ETabValue } from '../../@types/tab';
import { Row } from '@tanstack/react-table';
import { GetBatchDTO } from '@/dtos/batch/batch.dto';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { addPackageTrackingAction } from '@/actions/package/addPackageTrackingAction';
import { BatchStates, PackageTrackingActions } from '@/constants';
import { updateBatches } from '@/actions/batch/updateBatches';

export default function AwaitingBatches() {
  const columns = getColumns({
    include: {
      select: true,
      sentBranch: true,
    },
  });

  const { batchesMap } = useBatches();
  const awaitingBatches = batchesMap?.[ETabValue.GONNA_RECEIVE] || [];

  return (
    <div>
      <TableTemplate
        tableProps={{
          columns,
          data: awaitingBatches,
        }}
        include={{
          select: true,
        }}
        produceCustomComponent={({ table }) => {
          const selectedRows = table.getFilteredSelectedRowModel().rows;
          return (
            <ReceiveDialog
              selectedRows={selectedRows}
              awaitingBatches={awaitingBatches}
              toggleAllRowsSelected={table.toggleAllRowsSelected}
            />
          );
        }}
      />
    </div>
  );
}

function ReceiveDialog({
  selectedRows,
  awaitingBatches,
  toggleAllRowsSelected,
}: {
  selectedRows: Row<GetBatchDTO>[];
  awaitingBatches: GetBatchDTO[];
  toggleAllRowsSelected: (isSelected: boolean) => void;
}) {
  const { branch } = useBranch();
  const { batchesMap, setBatchesMap } = useBatches();
  const { packagesMap, setPackagesMap } = usePackages();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReceive = async () => {
    setLoading(true);

    const updatedAwaitingBatches = awaitingBatches.filter(
      (batch) => !selectedRows.some((row) => row.original._id === batch._id)
    );
    setBatchesMap({
      ...batchesMap,
      [ETabValue.GONNA_RECEIVE]: updatedAwaitingBatches,
    });

    await Promise.all(
      selectedRows.map((row) =>
        updateBatches([row.original._id], {
          state: BatchStates.ARRIVED,
          receivedTime: new Date(),
        })
      )
    );

    for (const row of selectedRows) {
      const res = await Promise.all(
        row.original.packages.map((packageId) =>
          addPackageTrackingAction({
            _id: packageId,
            branchId: branch?._id,
            actionType: PackageTrackingActions.ARRIVED,
          })
        )
      );
      const packages = res.map((res) => res.data);

      setPackagesMap({
        ...packagesMap,
        [ETabValue.PENDING_PACKAGE]: [
          ...(packagesMap[ETabValue.PENDING_PACKAGE] || []),
          ...packages,
        ],
      });
    }

    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      toggleAllRowsSelected(false);
      toast.success('Tiếp nhận lô hàng thành công');
    }, 200);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => selectedRows.length !== 0 && setOpen(open)}
      defaultOpen={false}
    >
      <DialogTrigger asChild>
        <Button variant='default' disabled={selectedRows.length === 0 || loading}>
          Tiếp nhận lô hàng
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h3 className='text-lg font-semibold'>Tiếp nhận lô hàng</h3>
        </DialogHeader>
        <p className='text-sm text-gray-500'>Xác nhận tiếp nhận các lô hàng đã chọn?</p>
        <DialogFooter>
          <Button variant='default' className='mr-2' onClick={handleReceive} disabled={loading}>
            {loading ? <Loader2 className='h-5 w-5' /> : 'Tiếp nhận'}
          </Button>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Hủy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
