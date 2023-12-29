import Sidebar from '@/components/main/Sidebar';
import Topbar from '@/components/main/Topbar';

export default function ManagementLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen w-screen flex-row bg-gray-50'>
      <Sidebar />
      <div className='flex flex-1 flex-col'>
        <Topbar />
        <main className='flex-1 overflow-y-auto'>{children}</main>
      </div>
    </div>
  );
}
