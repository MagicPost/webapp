'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PackageStates } from '@/constants';
import { GetPackageDTO } from '@/dtos/package/package.dto';
import { getTimeString, getViLocaleDateString } from '@/lib/time';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

export const getColumns = ({
  include,
}: {
  include: {
    select?: boolean;
    sentBranch?: boolean;
    receivedBranch?: boolean;
    receivedTime?: boolean;
    nextBranch?: boolean;
  };
}) => {
  const cols: ColumnDef<GetPackageDTO>[] = [
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
      accessorKey: '_id',
      header: 'Mã đơn hàng',
      cell: ({ row }) => row.original._id,
    },
    {
      accessorKey: 'senderAddress',
      header: 'Địa chỉ gửi',
      cell: ({ row }) => (
        <div className='min-w-[8rem] overflow-ellipsis'>{row.original.sender.address}</div>
      ),
    },
    {
      accessorKey: 'receiverAddress',
      header: 'Địa chỉ nhận',
      cell: ({ row }) => (
        <div className='min-w-[8rem] overflow-ellipsis'>{row.original.receiver.address}</div>
      ),
    },
    {
      accessorKey: 'itemLength',
      header: 'Số lượng hàng',
      cell: ({ row }) => {
        return row.original.items.length;
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='-ml-4'
          >
            Thời gian tạo
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <span>
            {getViLocaleDateString(row.original.createdAt)} {getTimeString(row.original.createdAt)}
          </span>
        );
      },
    },
    {
      accessorKey: 'nextBranch',
      header: 'Điểm đến tiếp theo',
      cell: ({ row }) => {
        if (row.original.state !== PackageStates.PENDING__READY_TO_TRANSER) return 'N/A';
        const nextBranch = row.original.tracking.find((log) => log.actions.length === 0);
        return <div className='min-w-[6rem] overflow-ellipsis'>{nextBranch?.branch.name}</div>;
      },
      meta: {
        hidden: !include.nextBranch,
      },
    },
    {
      accessorKey: 'state',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Trạng thái
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className='ml-0 w-32 pl-0 text-center'>
            {row.original.state === PackageStates.PENDING__READY_TO_DELIVER ? (
              <Badge className='select-none bg-lime-700 hover:bg-lime-600'>Sẵn sàng giao</Badge>
            ) : (
              <Badge className='select-none bg-blue-600 hover:bg-blue-500'>Sẵn sàng chuyển</Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'actions',
      header: '',
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>...</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem>
                <Button variant={'ghost'}>Xem chi tiết</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return cols;
};
