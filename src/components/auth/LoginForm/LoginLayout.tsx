import { cn } from '@/lib/utils';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className={cn(
        'flex h-screen w-screen items-center justify-center p-4',
        ' bg-orange-700 bg-opacity-70'
      )}
    >
      <div className='w-[480px] rounded-sm bg-background p-12'>{children}</div>
    </main>
  );
}
