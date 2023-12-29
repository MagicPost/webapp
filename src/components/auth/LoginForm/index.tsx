'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { BranchTypeSelector } from './BranchTypeSelector';
import { emailError, passwordError } from './constants';
import { Loader2 } from 'lucide-react';
import { BranchTypes } from '@/constants';
import CustomAlert from '@/components/main/CustomAlert';
import { usePathname, useRouter } from 'next/navigation';
import { ActionResponse } from '@/actions/types';
import { authenticate } from '@/actions/auth';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  branchType: z.enum([BranchTypes.COLLECTION_POINT, BranchTypes.TRANSACTION_POINT]).optional(),
  email: z.string().email(emailError.invalid),
  password: z.string().min(8, passwordError.length).max(32, passwordError.length),
});

export default function LoginForm({ isAdminArea = false }: { isAdminArea?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | undefined>('');
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branchType: !isAdminArea ? BranchTypes.COLLECTION_POINT : undefined,
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const res: ActionResponse | undefined = await authenticate({
        redirect: false,
        isAdminArea,
        branchType: values.branchType,
        email: values.email,
        password: values.password,
      });
      if (!res?.ok) throw res;
      toast({
        title: 'Đăng nhập thành công',
        description: res.message,
        variant: 'default',
      });
      setApiError(undefined);
      setTimeout(() => {
        router.push(`${pathname}/../`);
      }, 800);
    } catch (error: any) {
      setApiError(error.message);
      toast({
        title: 'Đăng nhập thất bại',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {!isAdminArea && (
          <FormField
            control={form.control}
            name={'branchType'}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <BranchTypeSelector {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        {apiError && <CustomAlert variant='destructive' description={apiError} />}

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <Label>Email</Label>
              <FormControl>
                <Input placeholder='Nhập email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <Label>Mật khẩu</Label>
              <FormControl>
                <Input
                  placeholder='Nhập mật khẩu'
                  type={showPassword ? 'text' : 'password'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex flex-col items-start sm:flex-row sm:items-center'>
          <div className='flex flex-row items-center justify-center gap-2 space-y-0'>
            <div className='flex flex-row items-center justify-center'>
              <Checkbox id='show-password' onCheckedChange={() => setShowPassword((old) => !old)} />
            </div>
            <label
              htmlFor='show-password'
              className='cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Hiện mật khẩu
            </label>
          </div>

          <Button variant='link' className='ml-auto text-slate-600' asChild>
            {/* TODO: replace with Link  */}
            <p>Quên mật khẩu?</p>
          </Button>
        </div>

        <Button
          type='submit'
          disabled={loading}
          className='flex w-full flex-row items-center justify-center gap-2'
        >
          {loading && <Loader2 className='h-4 w-4 animate-spin' />}
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Button>
      </form>
    </Form>
  );
}
