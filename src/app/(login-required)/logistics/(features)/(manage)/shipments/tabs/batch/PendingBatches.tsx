'use client';

import { GetBasicBranchDTO } from '@/dtos/branches/branch.dto';
import TableTemplate from '../../tables/TableTemplate';
import { getColumns } from '../../tables/batch-columns';
import { useBatches, usePackages } from '../../context';
import { ETabValue } from '../../@types/tab';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Row } from '@tanstack/react-table';
import { GetBatchDTO } from '@/dtos/batch/batch.dto';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PendingBatches({}: {
  branch: Omit<GetBasicBranchDTO, 'address' | 'manager'>;
}) {
  const columns = getColumns({
    include: {
      select: true,
      receivedBranch: true,
    },
  });

  const { batchesMap } = useBatches();
  const pendingBatches = batchesMap?.[ETabValue.PENDING_BATCH] || [];

  return (
    <div>
      <TableTemplate
        tableProps={{
          columns,
          data: pendingBatches,
        }}
        include={{
          select: true,
        }}
        produceCustomComponent={({ table }) => {
          const selectedRows = table.getFilteredSelectedRowModel().rows;
          return (
            <ForwardDialog
              selectedRows={selectedRows}
              pendingBatches={pendingBatches}
              toggleAllRowsSelected={table.toggleAllRowsSelected}
            />
          );
        }}
      />
    </div>
  );
}

function ForwardDialog({
  selectedRows,
  pendingBatches,
  toggleAllRowsSelected,
}: {
  selectedRows: Row<GetBatchDTO>[];
  pendingBatches: GetBatchDTO[];
  toggleAllRowsSelected: (value?: boolean) => void;
}) {
  const { batchesMap, setBatchesMap } = useBatches();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onTransfer = () => {
    const updatedPendingBatches = pendingBatches.filter(
      (batch) => !selectedRows.some((row) => row.original._id === batch._id)
    );

    const updatedFowardingBatches = [
      ...(batchesMap[ETabValue.FORWARDING] || []),
      ...selectedRows.map((row) => row.original),
    ];

    setLoading(true);
    setBatchesMap({
      ...batchesMap,
      [ETabValue.PENDING_BATCH]: updatedPendingBatches,
      [ETabValue.FORWARDING]: updatedFowardingBatches,
    });
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      toggleAllRowsSelected(false);
      toast.success('Xác nhận chuyển lô hàng thành công');
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)} defaultOpen={false}>
      <DialogTrigger>
        <Button variant='default' disabled={selectedRows.length === 0 || loading}>
          Chuyển tiếp
        </Button>
      </DialogTrigger>

      <DialogContent className='flex flex-col items-center justify-center space-y-2'>
        <DialogHeader className='text-lg font-semibold'>Chuyển lô hàng</DialogHeader>
        <span className='text-sm text-gray-500'>Xác nhận chuyển tiếp các lô hàng đã chọn?</span>
        <DialogFooter className='flex justify-end space-x-2'>
          <Button
            variant={'default'}
            disabled={selectedRows.length === 0 || loading}
            onClick={() => {
              if (selectedRows.length === 0) return;
              onTransfer();
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
