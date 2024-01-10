'use client';

import { GetBasicBranchDTO } from '@/dtos/branches/branch.dto';
import TableTemplate from '../../tables/TableTemplate';
import { getColumns } from '../../tables/batch-columns';
import { useBatches } from '../../context';
import { ETabValue } from '../../@types/tab';

export default function InTransitBatches({}: {
  branch: Omit<GetBasicBranchDTO, 'address' | 'manager'>;
}) {
  const columns = getColumns({
    include: {
      receivedBranch: true,
      createdTime: true,
      sentTime: true,
    },
  });

  const { batchesMap } = useBatches();
  const inTransitBatches = batchesMap?.[ETabValue.FORWARDING] || [];

  return (
    <div>
      <TableTemplate
        tableProps={{
          columns,
          data: inTransitBatches,
        }}
      />
    </div>
  );
}
