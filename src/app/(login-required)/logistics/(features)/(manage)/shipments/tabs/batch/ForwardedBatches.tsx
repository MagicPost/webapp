'use client';

import TableTemplate from '../../tables/TableTemplate';
import { getColumns } from '../../tables/batch-columns';
import { useBatches } from '../../context';
import { ETabValue } from '../../@types/tab';

export default function TransferredBatches() {
  const columns = getColumns({
    include: {
      receivedBranch: true,
      receivedTime: true,
    },
  });

  const { batchesMap } = useBatches();
  const forwardedBatches = batchesMap?.[ETabValue.FORWARDED] || [];

  return (
    <div>
      <TableTemplate
        tableProps={{
          columns,
          data: forwardedBatches,
        }}
      />
    </div>
  );
}
