'use client';

import { GetBasicBranchDTO } from '@/dtos/branches/branch.dto';
import TableTemplate from '../../tables/TableTemplate';
import { getColumns } from '../../tables/package-columns';
import { useQuery } from '@tanstack/react-query';
import { getPackages } from '@/actions/package/getPackages';
import { PackageStates } from '@/constants';
import toast from 'react-hot-toast';
import Empty from '@/components/main/Empty';
import { GetPackageDTO } from '@/dtos/package/package.dto';

export default function UnhandledPackages({
  branch,
}: {
  branch: Omit<GetBasicBranchDTO, 'address' | 'manager'>;
}) {
  const columns = getColumns({
    include: {
      //   receivedTime: true,
    },
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ['unhandled-packages'],
    queryFn: () =>
      new Promise((resolve, reject) => {
        getPackages({
          state: PackageStates.PENDING,
        })
          .then((res) => {
            if (!res.ok) throw new Error(res.message);
            else resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      }),
    enabled: false,
  });

  if (error && !data) {
    toast.error(error.message);
    return <Empty message='Có lỗi xảy ra!' />;
  }

  const packages = (data || []) as GetPackageDTO[];

  return (
    <div>
      <TableTemplate
        tableProps={{
          columns,
          data: packages,
        }}
      />
    </div>
  );
}
