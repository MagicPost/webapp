import Logo from '@/components/main/Logo';
import LoginForm from '@/components/auth/LoginForm';
import { Badge } from '@/components/ui/badge';
import LoginLayout from '@/components/auth/LoginForm/LoginLayout';

export const fetchCache = 'force-no-store';

export default function LoginPage() {
  return (
    <LoginLayout>
      <div className='mb-8 flex flex-row gap-4'>
        <Logo />
        <Badge variant={'outline'} className='rounded-lg border-2 border-gray-800 text-sm'>
          Admin
        </Badge>
      </div>
      <LoginForm isAdminArea={true} />
    </LoginLayout>
  );
}
