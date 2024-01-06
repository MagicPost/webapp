'use client';

import { GetBasicBranchDTO } from '@/dtos/branches/branch.dto';
import TableTemplate from '../../tables/TableTemplate';
import { getColumns } from '../../tables/batch-columns';
import { BatchStates, BranchTypes } from '@/constants';

export default function AwaitingBatches({
  branch,
}: {
  branch: Omit<GetBasicBranchDTO, 'address' | 'manager'>;
}) {
  const columns = getColumns({
    include: {
      sentBranch: true,
    },
  });

  return (
    <div>
      <TableTemplate
        tableProps={{
          columns,
          data: [
            {
              _id: '123',
              createdAt: '2021-09-09T00:00:00.000Z',
              truckId: '123',
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
              state: BatchStates.ARRIVED,
            },
          ],
        }}
      />
    </div>
  );
}
