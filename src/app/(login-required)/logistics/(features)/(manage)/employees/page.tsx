import { getEmployees } from '@/actions/user/getEmployees';
import { GetUserDTO } from '@/dtos/user/user.dto';
import StaffTable from './_components/StaffTable';
import { columns } from './_components/StaffColumns';
import { auth } from '@/lib/auth';
import { GetBasicBranchDTO } from '@/dtos/branches/branch.dto';
import { getBranchOf } from '@/actions/branch/getBranchOf';

export default async function EmployeesPage() {
  const session = await auth();

  const branch: Omit<GetBasicBranchDTO, 'address' | 'manager'> = (
    await getBranchOf({
      user: { email: session?.user?.email },
    })
  ).data;

  const staffs: GetUserDTO[] = (
    await getEmployees({
      isManager: false,
      filter: {
        branch,
      },
    })
  )?.data;

  staffs?.forEach((staff) => {
    staff.branch = branch;
  });

  return (
    <div className='p-4'>
      <h1 className='mb-4 text-2xl font-bold'>Quản lý nhân sự</h1>
      <StaffTable
        tableProps={{
          data: staffs!,
          columns,
        }}
        branchInfo={branch}
      />
    </div>
  );
}
