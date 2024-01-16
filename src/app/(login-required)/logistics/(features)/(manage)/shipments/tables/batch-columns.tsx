'use client';

import { Badge } from '@/components/ui/badge';
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
import { BatchStates } from '@/constants';
import { GetBatchDTO } from '@/dtos/batch/batch.dto';
import { getTimeString, getViLocaleDateString } from '@/lib/time';
import { cn } from '@/lib/utils';
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
      accessorKey: 'truckCode',
      header: 'Mã xe tải',
      cell: ({ row }) => row.original.truckCode,
    },
    {
      accessorKey: 'sentBranch',
      header: 'Chi nhánh gửi',
      cell: ({ row }) => {
        return row.original.from.name;
      },
      meta: {
        hidden: !include.sentBranch,
      },
    },
    {
      accessorKey: 'receivedBranch',
      header: 'Chi nhánh nhận',
      cell: ({ row }) => {
        return row.original.to.name;
      },
      meta: {
        hidden: !include.receivedBranch,
      },
    },
    {
      accessorKey: 'packageNumber',
      header: 'Số lượng đơn hàng',
      cell: ({ row }) => row.original.packages.length,
    },
    {
      accessorKey: 'createdAt',
      header: 'Thời gian tạo',
      cell: ({ row }) => {
        return (
          <span>
            {getViLocaleDateString(row.original.createdAt)} {getTimeString(row.original.createdAt)}
          </span>
        );
      },
      meta: {
        hidden: !include.sentTime,
      },
    },
    {
      accessorKey: 'sentTime',
      header: 'Thời gian gửi',
      cell: ({ row }) => {
        return (
          <span>
            {getViLocaleDateString(row.original.sentTime)} {getTimeString(row.original.sentTime)}
          </span>
        );
      },
      meta: {
        hidden: !include.sentTime,
      },
    },
    {
      accessorKey: 'receivedTime',
      header: 'Thời gian nhận',
      cell: ({ row }) => {
        return (
          <span>
            {getViLocaleDateString(row.original.receivedTime)}{' '}
            {getTimeString(row.original.receivedTime)}
          </span>
        );
      },
      meta: {
        hidden: !include.receivedTime,
      },
    },
    {
      accessorKey: 'state',
      header: 'Trạng thái',
      cell: ({ row }) => {
        return (
          <div className='w-32 text-left'>
            <Badge
              className={cn('select-none', {
                'bg-gray-500 hover:bg-gray-400': row.original.state === BatchStates.PENDING,
                'bg-blue-700 hover:bg-blue-600': row.original.state === BatchStates.IN_TRANSIT,
                'bg-green-700 hover:bg-green-600': row.original.state === BatchStates.ARRIVED,
              })}
            >
              {
                {
                  [BatchStates.PENDING]: 'Chưa xử lý',
                  [BatchStates.IN_TRANSIT]: 'Đang vận chuyển',
                  [BatchStates.ARRIVED]: 'Đã nhận',
                }[row.original.state]
              }
            </Badge>
          </div>
        );
      },
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
              <DropdownMenuItem onClick={() => {}}>Xem chi tiết</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return cols;
};
