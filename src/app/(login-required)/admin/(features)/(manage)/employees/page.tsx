import { getEmployees } from '@/actions/user';
import EmployeeTable from './_components/EmployeeTable';
import { columns } from './_components/EmployeeColumns';

export default async function EmployeesPage() {
  const managers = (
    await getEmployees({
      isManager: true,
    })
  )?.data;

  const staffs = (
    await getEmployees({
      isManager: false,
    })
  )?.data;

  return (
    <div className='p-4'>
      <h1 className='mb-4 text-2xl font-bold'>Quản lý nhân sự</h1>

      <EmployeeTable columns={columns} data={[...managers!, ...staffs!]} />
    </div>
  );
}
