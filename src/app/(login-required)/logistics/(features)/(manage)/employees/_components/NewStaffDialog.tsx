'use client';

import { createEmployeeAccount } from '@/actions/user/createEmployeeAccount';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Gender, Roles } from '@/constants';
import { CreateUserDTO, GetUserDTO } from '@/dtos/user/user.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import validator from 'validator';

import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import CustomInputField from '@/components/main/CustomInputField';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { GetBasicBranchDTO } from '@/dtos/branches/branch.dto';

export default function NewStaffDialog({
  setStaffs,
  triggerClassName,
  branchInfo,
}: {
  setStaffs: Dispatch<SetStateAction<GetUserDTO[]>>;
  triggerClassName?: string;
  branchInfo: Omit<GetBasicBranchDTO, 'address' | 'manager'>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button
          className={cn('flex items-center gap-2', triggerClassName)}
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
        <NewStaffForm setStaffs={setStaffs} branchInfo={branchInfo} />
      </DialogContent>
    </Dialog>
  );
}

const formSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  gender: z.nativeEnum(Gender),
  firstName: z.string().min(1, 'Không được để trống'),
  lastName: z.string().min(1, 'Không được để trống'),
  phone: z.string().refine(validator.isMobilePhone, 'Số điện thoại không hợp lệ'),
});

function NewStaffForm({
  branchInfo,
  setStaffs,
}: {
  branchInfo: Omit<GetBasicBranchDTO, 'address' | 'manager'>;
  setStaffs: Dispatch<SetStateAction<GetUserDTO[]>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      gender: Gender.MALE,
      firstName: '',
      lastName: '',
      phone: '',
    },
    mode: 'onSubmit',
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const payload: CreateUserDTO = {
      role: Roles.STAFF,
      gender: data.gender,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      branch: branchInfo,
    };
    try {
      setLoading(true);
      const res = await createEmployeeAccount(payload);
      if (!res?.ok) throw res?.message as string;
      else {
        toast.success(res?.message);
        setStaffs((prev) => [
          ...prev,
          {
            ...res?.data,
            branch: branchInfo,
          },
        ]);
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
        <CustomInputField
          form={form}
          name='firstName'
          label='Họ'
          placeholder='Nhập họ'
          type='text'
          required
        />

        <CustomInputField
          form={form}
          name='lastName'
          label='Tên'
          placeholder='Nhập tên'
          type='text'
          required
        />

        <FormField
          control={form.control}
          name={'gender'}
          render={({ field }) => (
            <FormItem className='flex w-full flex-row items-center gap-4'>
              <FormLabel htmlFor={field.name} className='mt-1 w-1/4'>
                Giới tính
              </FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  className='flex w-3/4 flex-row gap-4'
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value={Gender.MALE} id='male' />
                    <Label htmlFor='male'>Nam</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value={Gender.FEMALE} id='female' />
                    <Label htmlFor='female'>Nữ</Label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <CustomInputField
          form={form}
          name='email'
          label='Email'
          placeholder='Nhập email'
          type='email'
          required
        />

        <CustomInputField
          form={form}
          name='phone'
          label='Số điện thoại'
          placeholder='Nhập số điện thoại'
          type='text'
          required
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
