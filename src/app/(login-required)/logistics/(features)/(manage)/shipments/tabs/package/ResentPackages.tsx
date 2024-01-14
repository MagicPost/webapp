'use client';

import TableTemplate from '../../tables/TableTemplate';
import { getColumns } from '../../tables/package-columns';
import { ETabValue } from '../../@types/tab';
import { usePackages } from '../../context';

export default function ResentPackages() {
  const columns = getColumns({ include: {} });

  const { packagesMap } = usePackages();
  const resentPackages = packagesMap?.[ETabValue.RESENT] || [];

  return (
    <div>
      <TableTemplate
        tableProps={{
          columns,
          data: resentPackages,
        }}
        include={{
          select: false,
        }}
      />
    </div>
  );
}
