import { getEmployees } from '@/actions/user';
import NewStaffDialog from './NewStaffDialog';

export default async function EmployeesPage() {
  const staffs = (
    await getEmployees({
      isManager: false,
    })
  )?.data;

  return (
    <div className='p-4'>
      <h1 className='text-xl font-semibold'>Quản lý nhân sự</h1>
      <div>
        Giao dịch viên
        {staffs && staffs.length > 0 ? (
          staffs.map((item, index) => <div key={index}>{JSON.stringify(item)}</div>)
        ) : (
          <div>Nothing</div>
        )}
      </div>
      <NewStaffDialog />
    </div>
  );
}
