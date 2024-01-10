'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GetBatchDTO } from '@/dtos/batch/batch.dto';
import { getViLocaleDateString } from '@/lib/time';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

export const getColumns = ({
  include,
}: {
  include: {
    select?: boolean;
    sentBranch?: boolean;
    receivedBranch?: boolean;
    createdTime?: boolean;
    sentTime?: boolean;
    receivedTime?: boolean;
  };
}) => {
  const cols: ColumnDef<GetBatchDTO>[] = [
    {
      id: 'select',
      accessorKey: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Chọn tất cả'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Chọn hàng'
        />
      ),
      meta: {
        hidden: !include.select,
      },
    },
    {
      accessorKey: 'batchId',
      header: 'Mã lô hàng',
      cell: ({ row }) => row.original._id,
    },
    {
      accessorKey: 'truckId',
      header: 'Mã xe tải',
    },
    {
      accessorKey: 'sentBranch',
      header: 'Chi nhánh gửi',
      // cell: ({ row }) => {
      //   return row.original.sentBranch.name;
      // },
      meta: {
        hidden: !include.sentBranch,
      },
    },
    {
      accessorKey: 'receivedBranch',
      header: 'Chi nhánh nhận',
      // cell: ({ row }) => {
      //   return row.original.receivedBranch.name;
      // },
      meta: {
        hidden: !include.receivedBranch,
      },
    },
    {
      accessorKey: 'packageNumber',
      header: 'Số lượng đơn hàng',
    },
    {
      accessorKey: 'createdAt',
      cell: ({ row }) => {
        return getViLocaleDateString(row.original.createdAt);
      },
      header: 'Thời gian tạo',
      meta: {
        hidden: !include.sentTime,
      },
    },
    {
      accessorKey: 'sentTime',
      cell: ({ row }) => {
        return getViLocaleDateString(row.original.sentTime);
      },
      header: 'Thời gian gửi',
      meta: {
        hidden: !include.sentTime,
      },
    },
    {
      accessorKey: 'receivedTime',
      cell: ({ row }) => {
        return getViLocaleDateString(row.original.receivedTime);
      },
      header: 'Thời gian nhận',
      meta: {
        hidden: !include.receivedTime,
      },
    },
    {
      accessorKey: 'state',
      header: 'Trạng thái',
    },
    {
      accessorKey: 'actions',
      header: '',
      cell: ({ row }) => {
        // const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Thao tác</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {}}>Xem chi tiết</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return cols;
};
