'use client';

import { GetBasicBranchDTO } from '@/dtos/branches/branch.dto';
import TableTemplate from '../../tables/TableTemplate';
import { getColumns } from '../../tables/package-columns';
import { PackageStates } from '@/constants';
import { Button } from '@/components/ui/button';
import { ETabValue } from '../../@types/tab';
import { usePackages } from '../../context';
import { Row } from '@tanstack/react-table';
import { GetPackageDTO } from '@/dtos/package/package.dto';

export default function PendingPackages({}: {
  branch: Omit<GetBasicBranchDTO, 'address' | 'manager'>;
}) {
  const columns = getColumns({
    include: {
      select: true,
    },
  });

  const { packagesMap, setPackagesMap } = usePackages();
  const pendingPackages = packagesMap?.[ETabValue.PENDING] || [];

  const onForward = (selectedRows: Row<GetPackageDTO>[]) => {
    const updatedPendingPackages = pendingPackages.filter(
      (item) => !selectedRows.some((row) => row.original._id === item._id)
    );
    // const updatedForwardingPackages = [
    //   ...packagesMap[ETabValue.FORWARDING]!,
    //   ...selectedRows.map((row) => row.original),
    // ];
    // setPackagesMap({
    //   ...packagesMap,
    //   [ETabValue.PENDING]: updatedPendingPackages,
    //   [ETabValue.FORWARDING]: updatedForwardingPackages,
    // });
  };

  const onDeliver = (selectedRows: Row<GetPackageDTO>[]) => {
    const updatedPendingPackages = pendingPackages.filter(
      (item) => !selectedRows.some((row) => row.original._id === item._id)
    );
    const updatedDeliveringPackages = [
      ...packagesMap[ETabValue.DELIVERING]!,
      ...selectedRows.map((row) => row.original),
    ];

    setPackagesMap({
      ...packagesMap,
      [ETabValue.PENDING]: updatedPendingPackages,
      [ETabValue.DELIVERING]: updatedDeliveringPackages,
    });
  };

  return (
    <div>
      <TableTemplate
        tableProps={{
          columns,
          data: pendingPackages,
        }}
        include={{
          select: true,
        }}
        produceCustomComponent={({ table }) => {
          const selectedRows = table.getFilteredSelectedRowModel().rows;
          const canTransfer = selectedRows.every(
            (row) => row.original.state === PackageStates.PENDING__READY_TO_TRANSER
          );
          const canDeliver = selectedRows.every(
            (row) => row.original.state === PackageStates.PENDING__READY_TO_DELIVER
          );

          return (
            <div className='flex justify-end'>
              <Button
                className='mr-2'
                disabled={!canTransfer || selectedRows.length === 0}
                onClick={() => {
                  if (!canTransfer || selectedRows.length === 0) return;
                  onForward(selectedRows);
                }}
              >
                Chuyển tiếp
              </Button>
              <Button
                variant='default'
                disabled={!canDeliver || selectedRows.length === 0}
                onClick={() => {
                  if (!canDeliver || selectedRows.length === 0) return;
                  onDeliver(selectedRows);
                }}
              >
                Giao hàng
              </Button>
            </div>
          );
        }}
      />
    </div>
  );
}
