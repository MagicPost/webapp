'use client';

import Empty from '@/components/main/Empty';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Table as TTable,
} from '@tanstack/react-table';
import { ReactNode, useState } from 'react';
import { GetBasicBranchDTO } from '@/dtos/branches/branch.dto';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function TableTemplate<TData, TValue>({
  tableProps: { columns, data },
  include,
  produceCustomComponent,
}: {
  tableProps: DataTableProps<TData, TValue>;
  include?: {
    select?: boolean;
  };
  branchInfo?: Omit<GetBasicBranchDTO, 'address' | 'manager'>;
  produceCustomComponent?: ({ table }: { table: TTable<TData> }) => ReactNode;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 6,
      },
      columnVisibility: columns.reduce((accumulator: Record<string, boolean>, item: any) => {
        accumulator[item.accessorKey!] = !item.meta?.hidden;
        return accumulator;
      }, {}),
    },
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div>
      <div className='flex flex-col-reverse items-center justify-between gap-2 py-4 sm:flex-row'>
        {include?.select && (
          <div className='flex-1 text-sm text-muted-foreground'>
            {table.getFilteredSelectedRowModel().rows.length} trên{' '}
            {table.getFilteredRowModel().rows.length} hàng được chọn.
          </div>
        )}
        {/* <Input
          placeholder='Tìm kiếm theo email...'
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
          className='w-full sm:max-w-sm'
        /> */}
        {produceCustomComponent && produceCustomComponent({ table })}
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          className={`${cell.column.id === 'active' ? 'text-center' : 'text-left'}`}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
                {table.getRowModel().rows.length < table.getState().pagination.pageSize &&
                  [
                    ...Array(
                      table.getState().pagination.pageSize - table.getRowModel().rows.length
                    ),
                  ].map((_, index) => (
                    <TableRow key={index}>
                      <TableCell colSpan={columns.length} className={`h-16`}></TableCell>
                    </TableRow>
                  ))}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-60 text-center'>
                  <Empty message='Chưa thêm tài khoản nào' />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant='outline'
                size='sm'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Trước
              </Button>
            </PaginationItem>
            {table.getPageCount() > 0 && <PaginationItem>1</PaginationItem>}
            {table.getPageCount() > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {table.getPageCount() > 1 && <PaginationItem>{table.getPageCount()}</PaginationItem>}
            <PaginationItem>
              <Button
                variant='outline'
                size='sm'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Sau
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
