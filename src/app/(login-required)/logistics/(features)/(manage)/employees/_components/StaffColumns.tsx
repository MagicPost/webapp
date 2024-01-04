'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GetUserDTO } from '@/dtos/user/user.dto';
import { roleToText } from '@/lib/text';
import { getViLocaleDateString } from '@/lib/time';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

export const columns: ColumnDef<GetUserDTO>[] = [
  {
    accessorKey: 'role',
    header: 'Vai trò',
    cell: ({ row }) => roleToText(row.original.role),
  },
  {
    accessorKey: 'branch',
    header: 'Chi nhánh',
    cell: ({ row }) => {
      return row.original.branch ? (
        <span>{row.original.branch.name}</span>
      ) : (
        <span className='text-red-600'>Chưa có</span>
      );
    },
  },
  {
    accessorKey: 'fullname',
    header: 'Họ tên',
    cell: ({ row }) => {
      return (
        <div className='flex flex-row items-center justify-start gap-4'>
          <Image
            src={`/avatar/${row.original.gender}.svg`}
            alt={'avatar'}
            width={0}
            height={0}
            className='h-8 w-8 rounded-full'
          />
          <p className='font-semibold'>
            {row.original.firstName} {row.original.lastName}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Số điện thoại',
    cell: ({ row }) => {
      return row.original.phone ? row.original.phone : 'Chưa có';
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
          Ngày cấp
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'active',
    header: 'Trạng thái',
    cell: ({ row }) => {
      return row.original.active ? (
        <Badge className='select-none bg-lime-600 hover:bg-lime-500'>Đã kích hoạt</Badge>
      ) : (
        <Badge className=' select-none bg-red-600 hover:bg-red-500'>Chưa kích hoạt</Badge>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user._id)}>
              Copy mã nhân viên
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
