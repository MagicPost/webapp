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
import { GetUserDTO } from '@/dtos/user/user.dto';
import { roleToText } from '@/lib/text';
import { getViLocaleDateString } from '@/lib/time';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Check, MoreHorizontal, X } from 'lucide-react';

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
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
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
    header: 'Kích hoạt',
    cell: ({ row }) => {
      return row.original.active ? (
        <Check className='text-teal-500' />
      ) : (
        <X className='text-rose-400' />
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
