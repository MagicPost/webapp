'use client';

import { GetBasicBranchDTO } from '@/dtos/branches/branch.dto';
import TableTemplate from '../../tables/TableTemplate';
import { getColumns } from '../../tables/package-columns';
import { Button } from '@/components/ui/button';
import { ETabValue } from '../../@types/tab';
import { usePackages } from '../../context';
import { Row } from '@tanstack/react-table';
import { GetPackageDTO } from '@/dtos/package/package.dto';

export default function DeliveringPackages({}: {
  branch: Omit<GetBasicBranchDTO, 'address' | 'manager'>;
}) {
  const columns = getColumns({
    include: {
      select: true,
    },
  });

  const { packagesMap, setPackagesMap } = usePackages();
  const deliveringPackages = packagesMap?.[ETabValue.DELIVERING] || [];

  const onConfirmDelivered = (selectedRows: Row<GetPackageDTO>[]) => {
    const updatedDeliveringPackages = deliveringPackages.filter(
      (item) => !selectedRows.some((row) => row.original._id === item._id)
    );
    const updatedDeliveredPackages = [
      ...packagesMap[ETabValue.DELIVERED]!,
      ...selectedRows.map((row) => row.original),
    ];
    setPackagesMap({
      ...packagesMap,
      [ETabValue.DELIVERING]: updatedDeliveringPackages,
      [ETabValue.DELIVERED]: updatedDeliveredPackages,
    });
  };

  const onConfirmResent = (selectedRows: Row<GetPackageDTO>[]) => {
    const updatedDeliveringPackages = deliveringPackages.filter(
      (item) => !selectedRows.some((row) => row.original._id === item._id)
    );
    const updatedResentPackages = [
      ...packagesMap[ETabValue.RESENT]!,
      ...selectedRows.map((row) => row.original),
    ];

    setPackagesMap({
      ...packagesMap,
      [ETabValue.DELIVERING]: updatedDeliveringPackages,
      [ETabValue.RESENT]: updatedResentPackages,
    });
  };

  return (
    <div>
      <TableTemplate
        tableProps={{
          columns,
          data: deliveringPackages,
        }}
        include={{
          select: true,
        }}
        produceCustomComponent={({ table }) => {
          const selectedRows = table.getFilteredSelectedRowModel().rows;

          return (
            <div className='flex justify-end'>
              <Button
                className='mr-2'
                onClick={() => {
                  onConfirmDelivered(selectedRows);
                  table.toggleAllRowsSelected(false);
                }}
              >
                Giao hàng thành công
              </Button>
              <Button
                variant='default'
                onClick={() => {
                  onConfirmResent(selectedRows);
                  table.toggleAllRowsSelected(false);
                }}
              >
                Xác nhận trả hàng
              </Button>
            </div>
          );
        }}
      />
    </div>
  );
}
