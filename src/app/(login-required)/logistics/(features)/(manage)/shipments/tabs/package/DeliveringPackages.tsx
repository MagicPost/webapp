'use client';

import TableTemplate from '../../tables/TableTemplate';
import { getColumns } from '../../tables/package-columns';
import { Button } from '@/components/ui/button';
import { ETabValue } from '../../@types/tab';
import { useBranch, usePackages } from '../../context';
import { Row } from '@tanstack/react-table';
import { GetPackageDTO } from '@/dtos/package/package.dto';
import { addPackageTrackingAction } from '@/actions/package/addPackageTrackingAction';
import { PackageTrackingActions } from '@/constants';

export default function DeliveringPackages() {
  const columns = getColumns({
    include: {
      select: true,
    },
  });
  const { branch } = useBranch();
  const { packagesMap, setPackagesMap } = usePackages();
  const deliveringPackages = packagesMap?.[ETabValue.DELIVERING] || [];

  const onConfirmDelivered = async (selectedRows: Row<GetPackageDTO>[]) => {
    const updatedDeliveringPackages = deliveringPackages.filter(
      (item) => !selectedRows.some((row) => row.original._id === item._id)
    );

    const updatedResults = await Promise.all(
      selectedRows.map((row) =>
        addPackageTrackingAction({
          _id: row.original._id,
          branchId: branch?._id,
          actionType: PackageTrackingActions.DELIVERED,
        })
      )
    );

    const updatedDeliveredPackages = [
      ...packagesMap[ETabValue.DELIVERED]!,
      ...updatedResults.map((item) => item.data),
    ];

    setPackagesMap({
      ...packagesMap,
      [ETabValue.DELIVERING]: updatedDeliveringPackages,
      [ETabValue.DELIVERED]: updatedDeliveredPackages,
    });
  };

  const onConfirmResent = async (selectedRows: Row<GetPackageDTO>[]) => {
    const updatedDeliveringPackages = deliveringPackages.filter(
      (item) => !selectedRows.some((row) => row.original._id === item._id)
    );
    const updatedResults = await Promise.all(
      selectedRows.map((row) =>
        addPackageTrackingAction({
          _id: row.original._id,
          branchId: branch?._id,
          actionType: PackageTrackingActions.RESENT,
        })
      )
    );

    const updatedResentPackages = [
      ...packagesMap[ETabValue.RESENT]!,
      ...updatedResults.map((item) => item.data),
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
