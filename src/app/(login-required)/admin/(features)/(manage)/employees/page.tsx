import { getEmployees } from '@/actions/user';
import NewManagerDialog from './NewManagerDialog';

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

  // console.log(managers);
  // console.log(staffs);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>Quản lý nhân sự</h1>
      <div>
        Trưởng điểm chi nhánh
        {managers && managers.length > 0 ? (
          managers.map((item, index) => <div key={index}>{JSON.stringify(item)}</div>)
        ) : (
          <div>Nothing</div>
        )}
      </div>

      <div>
        Giao dịch viên
        {staffs && staffs.length > 0 ? (
          staffs.map((item, index) => <div key={index}>{JSON.stringify(item)}</div>)
        ) : (
          <div>Nothing</div>
        )}
      </div>

      <NewManagerDialog />
    </div>
  );
}
