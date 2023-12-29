'use client';

import { createCollectionPoint } from '@/actions/branch';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CreateCollectionPointDTO } from '@/dtos/branches/collection-point.dto';
import { postalCodeRegex } from '@/lib/regex';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

export default function NewBranchDialog() {
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
          <Plus className='h-4 w-4 text-lg font-semibold' /> Thêm điểm tập kết
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='mx-auto my-4 text-center text-xl font-semibold'>
          Thêm điểm tập kết
        </DialogHeader>
        <NewBranchForm />
      </DialogContent>
    </Dialog>
  );
}

const formSchema = z.object({
  name: z.string(),
  address: z.string(),
  district: z.string(),
  province: z.string(),
  postalCode: z.string().regex(postalCodeRegex, 'Mã bưu điện không hợp lệ'),
});

function NewBranchForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      district: '',
      province: '',
      postalCode: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const payload: CreateCollectionPointDTO = data;
    const res = await createCollectionPoint(payload);
    if (!res?.ok) {
      toast.error(res?.message);
    } else {
      toast.success(res?.message);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Nhập tên điểm tập kết' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Nhập địa chỉ' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='district'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Nhập quận/huyện' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='province'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Nhập tỉnh/thành phố' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='postalCode'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Nhập mã bưu điện' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex flex-row items-center justify-center gap-2'>
          <Button variant='default'>Thêm</Button>
        </div>
      </form>
    </Form>
  );
}
