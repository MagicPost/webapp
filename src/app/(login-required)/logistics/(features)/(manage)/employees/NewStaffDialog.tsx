'use client';

import { createEmployeeAccount } from '@/actions/user/createEmployeeAccount';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { BranchTypes, Roles } from '@/constants';
import { CreateUserDTO } from '@/dtos/user/user.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import validator from 'validator';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

export default function NewStaffDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button
          className='flex items-center gap-2'
          onClick={() => {
            setOpen(true);
          }}
        >
          <Plus className='h-4 w-4 text-lg font-semibold' /> Thêm tài khoản giao dịch viên
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='mx-auto my-4 text-center text-xl font-semibold'>
          Thêm tài khoản giao dịch viên
        </DialogHeader>
        <NewManagerForm />
      </DialogContent>
    </Dialog>
  );
}

const formSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  firstName: z.string().min(1, 'Không được để trống'),
  lastName: z.string().min(1, 'Không được để trống'),
  phone: z.string().refine(validator.isMobilePhone, 'Số điện thoại không hợp lệ').or(z.literal('')),
  branchType: z.nativeEnum(BranchTypes),
  branchId: z.string().optional(),
});

function NewManagerForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      branchType: BranchTypes.TRANSACTION_POINT,
      branchId: '',
    },
    mode: 'onSubmit',
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const payload: CreateUserDTO = {
      gender: 'male',
      role: Roles.STAFF,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      branch: {
        type: data.branchType,
        _id: data.branchId!,
      },
    };
    try {
      setLoading(true);
      const res = await createEmployeeAccount(payload);
      if (!res?.ok) throw res?.message as string;
      else {
        toast.success(res?.message);
        form.reset();
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : err;
      toast.error(msg as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className='text-red-600'>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder='Nhập email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex flex-row items-center justify-between gap-2'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem className='w-full flex-1'>
                <FormLabel>
                  Họ <span className='text-red-600'>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='Nhập họ' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem className='w-full flex-1'>
                <FormLabel>
                  Tên <span className='text-red-600'>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='Nhập tên' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input placeholder='Nhập số điện thoại' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='branchType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Loại chi nhánh <span className='text-red-600'>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder='Loai chi nhanh' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='branchId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Id chi nhánh <span className='text-red-600'>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder='_id' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex flex-row items-center justify-center gap-2'>
          <Button variant='default' disabled={loading} type='submit'>
            Thêm
          </Button>
        </div>
      </form>
    </Form>
  );
}
