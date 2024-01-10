'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GetPackageDTO } from '@/dtos/package/package.dto';
import { getViLocaleDateString } from '@/lib/time';
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
      cell: ({ row }) => row.original.sender.address,
    },
    {
      accessorKey: 'receiverAddress',
      header: 'Địa chỉ nhận',
      cell: ({ row }) => row.original.receiver.address,
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
      cell: ({ row }) => {
        return getViLocaleDateString(row.original.createdAt);
      },
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='-ml-4'
          >
            Ngày tạo
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
    },
    {
      accessorKey: 'state',
      cell: ({ row }) => {
        return row.original.state;
        // <Badge className='select-none bg-lime-600 hover:bg-lime-500'>Đã kích hoạt</Badge>
      },
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='-ml-4'
          >
            Trạng thái
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
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
