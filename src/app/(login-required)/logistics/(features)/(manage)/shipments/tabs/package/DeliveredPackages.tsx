'use client';

import { GetBasicBranchDTO } from '@/dtos/branches/branch.dto';
import TableTemplate from '../../tables/TableTemplate';
import { getColumns } from '../../tables/package-columns';
import { ETabValue } from '../../@types/tab';
import { usePackages } from '../../context';

export default function DeliveredPackages({}: {
  branch: Omit<GetBasicBranchDTO, 'address' | 'manager'>;
}) {
  const columns = getColumns({ include: {} });

  const { packagesMap } = usePackages();
  const deliveredPackages = packagesMap?.[ETabValue.DELIVERED] || [];

  return (
    <div>
      <TableTemplate
        tableProps={{
          columns,
          data: deliveredPackages,
        }}
        include={{
          select: false,
        }}
      />
    </div>
  );
}
