'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { PointType } from './constants';
import { PointSelector } from './PointSelector';
import { emailError, passwordError } from './constants';

const formSchema = z.object({
  pointType: z.enum([PointType.COLLECTION, PointType.TRANSACTION]).optional(),
  email: z.string().email(emailError.invalid),
  password: z.string().min(8, passwordError.length).max(30, passwordError.length),
  remember: z.boolean(),
});

export default function LoginForm({ isAdmin = false }: { isAdmin?: boolean }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pointType: !isAdmin ? PointType.COLLECTION : undefined,
      email: '',
      password: '',
      remember: false,
    },
    mode: 'onBlur',
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: handle submit
    window.alert(JSON.stringify(values, null, 2));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        {!isAdmin && (
          <FormField
            control={form.control}
            name={'pointType'}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PointSelector {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
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
              <FormControl>
                <Input placeholder='Nhập mật khẩu' type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-row'>
          <FormField
            control={form.control}
            name='remember'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-center gap-2 space-y-0'>
                <FormControl className='flex flex-row items-center justify-center'>
                  <Checkbox id='keep-login' onCheckedChange={() => field.onChange(!field.value)} />
                </FormControl>
                <label
                  htmlFor='keep-login'
                  className='cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Giữ đăng nhập
                </label>
              </FormItem>
            )}
          />

          <Button variant='link' className='ml-auto text-slate-600' asChild>
            {/* TODO: replace with Link  */}
            <p>Quên mật khẩu?</p>
          </Button>
        </div>

        <Button type='submit' className='w-full'>
          Đăng nhập
        </Button>
      </form>
    </Form>
  );
}
