'use client';

import TableTemplate from '../../tables/TableTemplate';
import { getColumns } from '../../tables/batch-columns';
import { useBatches } from '../../context';
import { ETabValue } from '../../@types/tab';

export default function InTransitBatches() {
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
