'use client';

import { getPackagesByIds } from '@/actions/package/getPackages';
import Empty from '@/components/main/Empty';
import Loading from '@/components/main/Loading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BatchStates } from '@/constants';
import { GetBatchDTO } from '@/dtos/batch/batch.dto';
import { GetPackageDetailsDTO } from '@/dtos/package/package.dto';
import { getTimeString, getViLocaleDateString } from '@/lib/time';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

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
                'bg-lime-700 hover:bg-lime-600': row.original.state === BatchStates.IN_TRANSIT,
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
        return (
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <span className='sr-only'>Thao tác</span>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem>
                  <DialogTrigger asChild>
                    <Button variant='ghost'>Xem chi tiết</Button>
                  </DialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent
              className={cn(
                'h-[80vh] max-h-[800px] w-[96vw] max-w-[1600px] py-8 lg:w-[78vw]',
                'overflow-y-auto'
              )}
            >
              <BatchDetails batch={row.original} />
            </DialogContent>
          </Dialog>
        );
      },
    },
  ];

  return cols;
};

function BatchDetails({ batch }: { batch: GetBatchDTO }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['batch-details', batch._id],
    queryFn: () => {
      return new Promise((resolve, reject) => {
        getPackagesByIds(batch.packages)
          .then((res) => {
            if (!res.ok) throw new Error(res.message);
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    enabled: true,
  });

  const packagesData = data as GetPackageDetailsDTO[];

  return (
    <>
      {error && <Empty message='Đã có lỗi xảy ra' />}
      {isLoading && <Loading text='Đang tải' />}
      {data && (
        <div className='w-full space-y-2'>
          <h2 className='text-xl font-semibold'>Chi tiết lô hàng</h2>

          <div className='flex flex-col gap-2 sm:flex-row sm:gap-16'>
            <p>
              Mã lô hàng: <span className='ml-4 font-semibold'>{batch._id}</span>
            </p>
            <p>
              Mã xe tải: <span className='ml-4 font-semibold'>{batch.truckCode}</span>
            </p>
          </div>

          <p className='pt-6 text-sm underline underline-offset-2'>Tổng: {batch.packages.length}</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>Mã đơn hàng</TableHead>
                <TableHead>Địa chỉ người gửi</TableHead>
                <TableHead>Địa chỉ người nhận</TableHead>
                <TableHead>Số lượng hàng</TableHead>
                <TableHead>Nơi tạo đơn</TableHead>
                <TableHead>Thời gian tạo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packagesData.map((pkg, index) => (
                <TableRow key={index}>
                  <TableCell className='font-medium'>{pkg._id}</TableCell>
                  <TableCell>{pkg.sender.address}</TableCell>
                  <TableCell>{pkg.receiver.address}</TableCell>
                  <TableCell>{pkg.items.length}</TableCell>
                  <TableCell>{pkg.sentAt.name}</TableCell>
                  <TableCell>
                    {getViLocaleDateString(pkg.createdAt)} {getTimeString(pkg.createdAt)}
                  </TableCell>
                  <TableCell className='text-right'></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
