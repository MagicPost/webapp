import Sidebar from '@/components/main/Sidebar';

export default function FeatureLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen w-screen overflow-hidden pl-64'>
      <div className='fixed left-0 top-0 h-screen'>
        <Sidebar />
      </div>
      <div className='flex h-full w-full flex-col overflow-auto'>
        <main className='h-full flex-1'>{children}</main>
      </div>
    </div>
  );
}
