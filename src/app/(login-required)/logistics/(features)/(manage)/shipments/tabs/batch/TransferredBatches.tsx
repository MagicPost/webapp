'use client';

import TableTemplate from '../../tables/TableTemplate';
import { getColumns } from '../../tables/batch-columns';
import { BatchStates, BranchTypes } from '@/constants';
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
  const transferredBatches = batchesMap?.[ETabValue.FORWARDED] || [];

  return (
    <div>
      <TableTemplate
        tableProps={{
          columns,
          data: [
            {
              _id: '123',
              createdAt: '2021-09-09T00:00:00.000Z',
              truckCode: '123',
              from: {
                type: BranchTypes.COLLECTION_POINT,
                name: 'Chi nhánh 1',
                ref: '123',
              },
              to: {
                type: BranchTypes.TRANSACTION_POINT,
                name: 'Chi nhánh 2',
                ref: '123',
              },
              packages: [],
              state: BatchStates.ARRIVED,
            },
          ],
        }}
      />
    </div>
  );
}
