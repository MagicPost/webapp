'use client';

import CustomInput from '@/app/(login-required)/admin/(features)/(manage)/branches/_components/FormInput';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ZodObject, z } from 'zod';

const formSchema: ZodObject<any> = z.object({
  newPassword: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
  confirmPassword: z
    .string()
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .refine((data) => data === formSchema.shape.newPassword, 'Mật khẩu không khớp'),
});
export default function ActivateToken() {
  const token = useParams().token as string;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

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
        if (data.ok) setSuccess(true);
        setLoading(false);
      } catch (error) {
        setSuccess(false);
        console.log(error);
        setLoading(false);
      }
    };
    activate();
  }, [token]);

  if (!token) return null;

  if (loading)
    return (
      <div className='flex h-screen w-screen animate-spin items-center justify-center'>
        <Loader2 className='h-10 w-10' />
      </div>
    );

  if (success)
    return (
      <div className='flex flex-col items-center justify-center'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-4'>
              <CustomInput
                name='newPassword'
                label='Mật khẩu mới'
                type='password'
                control={form.control}
              />
              <CustomInput
                name='confirmPassword'
                label='Nhập lại mật khẩu mới'
                type='password'
                control={form.control}
              />
              <FormItem>
                <button
                  type='submit'
                  className='flex h-10 w-full items-center justify-center rounded-md bg-primary font-semibold text-white'
                >
                  Đặt lại mật khẩu
                </button>
              </FormItem>
            </div>
          </form>
        </Form>
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
