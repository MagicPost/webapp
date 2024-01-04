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
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

export const getColumns = () => {
  const cols: ColumnDef<GetPackageDTO>[] = [
    // {
    //   accessorKey: '',
    //   header: 'Mã đơn hàng',
    //   cell: ({ row }) => row.original._id,
    // },
    // {
    //   accessorKey: '',
    //   header: 'Người gửi',
    //   cell: ({ row }) => {
    //     return (
    //       <div className='flex flex-row items-center justify-start gap-4'>
    //         <Image
    //           src={`/avatar/${row.original.gender}.svg`}
    //           alt={'avatar'}
    //           width={0}
    //           height={0}
    //           className='h-8 w-8 rounded-full'
    //         />
    //         <p className='font-semibold'>
    //           {row.original.firstName} {row.original.lastName}
    //         </p>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   accessorKey: '',
    //   header: 'Người nhận',
    // },
    // {
    //   accessorKey: '',
    //   header: 'Số lượng hàng',
    //   cell: ({ row }) => {
    //     return row.original.phone ? row.original.phone : 'Chưa có';
    //   },
    // },
    // {
    //   accessorKey: '',
    //   cell: ({ row }) => {
    //     return getViLocaleDateString(row.original.createdAt);
    //   },
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant='ghost'
    //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //         className='-ml-4'
    //       >
    //         Ngày tạo
    //         <ArrowUpDown className='ml-2 h-4 w-4' />
    //       </Button>
    //     );
    //   },
    // },
    // {
    //   accessorKey: '',
    //   header: 'Trạng thái',
    //   cell: ({ row }) => {
    //     return row.original.active ? (
    //       <Badge className='select-none bg-lime-600 hover:bg-lime-500'>Đã kích hoạt</Badge>
    //     ) : (
    //       <Badge className=' select-none bg-red-600 hover:bg-red-500'>Chưa kích hoạt</Badge>
    //     );
    //   },
    // },
    {
      accessorKey: '',
      header: 'Thu hộ',
    },
    {
      accessorKey: '',
      header: 'Tổng cước',
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
                <span className='sr-only'>Thao tác</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
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

  return cols.filter(Boolean);
};
