'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
    sentBranch?: boolean;
    receivedBranch?: boolean;
    receivedTime?: boolean;
  };
}) => {
  const cols: ColumnDef<GetPackageDTO>[] = [
    {
      accessorKey: '',
      header: 'Mã đơn hàng',
      // cell: ({ row }) => row.original._id,
    },
    {
      accessorKey: '',
      header: 'Địa chỉ gửi',
    },
    {
      accessorKey: '',
      header: 'Địa chỉ nhận',
    },
    {
      accessorKey: '',
      header: 'Số lượng hàng',
      // cell: ({ row }) => {},
    },
    {
      accessorKey: '',
      // cell: ({ row }) => {
      //   return getViLocaleDateString(row.original.createdAt);
      // },
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
      accessorKey: '',
      header: 'Trạng thái',
      // cell: ({ row }) => {
      //   return row.original.active ? (
      //     <Badge className='select-none bg-lime-600 hover:bg-lime-500'>Đã kích hoạt</Badge>
      //   ) : (
      //     <Badge className=' select-none bg-red-600 hover:bg-red-500'>Chưa kích hoạt</Badge>
      //   );
      // },
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
