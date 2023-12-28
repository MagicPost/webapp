import Logo from '@/components/main/Logo';
import LoginForm from '@/components/auth/LoginForm';
import { Badge } from '@/components/ui/badge';

export default function LoginPage() {
  return (
    <main className='flex h-screen w-screen items-center justify-center bg-gray-300'>
      <div className='w-[480px] rounded-sm bg-white p-12'>
        <div className='mb-8 flex flex-row gap-4'>
          <Logo />
          <Badge variant={'outline'} className='rounded-lg border-2 border-gray-800 text-sm'>
            Logistics
          </Badge>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
