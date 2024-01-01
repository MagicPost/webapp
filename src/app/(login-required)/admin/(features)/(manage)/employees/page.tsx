import { getEmployees } from '@/actions/user';
import NewManagerDialog from './_components/NewManagerDialog';
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
      <h1 className='text-2xl font-bold'>Quản lý nhân sự</h1>
      {/* <div>
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
      </div> */}

      <EmployeeTable columns={columns} data={[...managers!, ...staffs!]} />

      <NewManagerDialog />
    </div>
  );
}
