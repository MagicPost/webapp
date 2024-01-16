'use client';

import { updateEmployeePassword } from '@/actions/user/updateEmployeeAccount';
import CustomInput from '@/components/main/CustomInput';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormItem } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const formSchema = z
  .object({
    newPassword: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
    confirmPassword: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword'],
  });
export default function ActivateToken() {
  const token = useParams().token as string;
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [changePassToken, setChangePassToken] = useState<string | undefined>(undefined);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    if (!token) return;
    const activate = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/auth/activate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
        if (data.ok) {
          setSuccess(true);
          setChangePassToken(data.data.token);
        }
        setLoading(false);
      } catch (error) {
        setSuccess(false);
        setLoading(false);
      }
    };
    activate();
  }, [token]);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    if (changePassToken) {
      await updateEmployeePassword({
        password: values.newPassword,
        token: changePassToken,
      })
        .then((res) => {
          setIsSubmitting(false);
          toast[res.ok ? 'success' : 'error'](res.message);
          router.push('/logistics/login');
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  if (!token) return null;

  if (loading)
    return (
      <div className='flex h-screen w-screen animate-spin items-center justify-center'>
        <Loader2 className='h-10 w-10' />
      </div>
    );

  if (success)
    return (
      <div>
        <div className='flex h-screen w-screen items-center justify-center'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex w-screen max-w-md flex-col gap-4 border p-4'>
                <div>
                  <p className='my-3 text-2xl font-semibold'>Đặt mật khẩu</p>
                </div>
                <CustomInput
                  name='newPassword'
                  label='Mật khẩu mới'
                  type={showPassword ? 'text' : 'password'}
                  control={form.control}
                  containerClassname='w-full'
                  inputClassname='w-full'
                />
                <CustomInput
                  name='confirmPassword'
                  label='Nhập lại mật khẩu mới'
                  type='password'
                  containerClassname='w-full'
                  inputClassname='w-full'
                  control={form.control}
                />
                <div className='flex flex-row items-center gap-2 space-y-0'>
                  <div className='flex flex-row items-center justify-center'>
                    <Checkbox
                      id='show-password'
                      onCheckedChange={() => setShowPassword((old) => !old)}
                    />
                  </div>
                  <label
                    htmlFor='show-password'
                    className='cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Hiện mật khẩu
                  </label>
                </div>
                <FormItem>
                  <Button
                    disabled={isSubmitting}
                    type='submit'
                    className='flex h-10 w-full items-center justify-center rounded-md bg-primary font-semibold text-white'
                  >
                    Đặt lại mật khẩu
                  </Button>
                </FormItem>
              </div>
            </form>
          </Form>
        </div>
      </div>
    );

  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center'>
      <p className='text-2xl font-semibold'>Đường dẫn không hợp lệ</p>
      <p className='text-lg'>
        Vui lòng kiểm tra lại đường dẫn, hoặc thử lại bằng cách tải lại trang.
      </p>
    </div>
  );
}
