'use client';

import { createCollectionPoint } from '@/actions/branch';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { CreateCollectionPointDTO } from '@/dtos/branches/collection-point.dto';
import { postalCodeRegex } from '@/lib/regex';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { provinces } from '@/constants/geography';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import CustomInputField from '@/components/main/CustomInputField';
import CustomComboBox from '@/components/main/CustomCombobox';

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
  name: z.string().min(1, 'Không được để trống!'),
  address: z.string().min(1, 'Không được để trống!'),
  district: z.string().min(1, 'Không được để trống!'),
  province: z.string().min(1, 'Không được để trống!'),
  ward: z.string().min(1, 'Không được để trống!'),
  postalCode: z.string().regex(postalCodeRegex, 'Mã bưu chính không hợp lệ'),
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
    mode: 'onBlur',
  });

  useEffect(() => {
    form.setValue('district', '');
    form.setValue('ward', '');
  }, [form.watch('province')]);

  useEffect(() => {
    form.setValue('ward', '');
  }, [form.watch('district')]);

  const provinceOptions = useMemo(() => {
    return provinces.map((province) => {
      return { label: province.name, value: province.codename };
    });
  }, []);

  const districtOptions = useMemo(() => {
    if (!form.watch('province')) return [];
    return (
      provinces
        .filter((province) => province.codename === form.watch('province'))[0]
        ?.districts.map((district) => {
          return { label: district.name, value: district.codename };
        }) || []
    );
  }, [form.watch('province')]);

  const wardOptions = useMemo(() => {
    if (!form.watch('province') || !form.watch('district')) return [];
    return (
      provinces
        .filter((province) => province.codename === form.watch('province'))[0]
        ?.districts.filter((district) => district.codename === form.watch('district'))[0]
        ?.wards.map((ward) => {
          return { label: ward.name, value: ward.codename };
        }) || []
    );
  }, [form.watch('province'), form.watch('district')]);

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
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-0 space-y-8'>
        <div className='flex-1'>
          <CustomInputField
            form={form}
            name='name'
            label='Tên'
            placeholder='Nhập tên điểm tập kết'
            type='text'
            required
          />

          <CustomInputField
            form={form}
            name='postalCode'
            label='Mã bưu chính'
            placeholder='Nhập mã bưu chính'
            type='text'
            required
          />
        </div>

        <div className='flex-1'>
          <CustomInputField
            form={form}
            name='address'
            label='Địa chỉ'
            placeholder='Nhập địa chỉ cụ thể'
            type='text'
            required
          />

          <div className='mt-2 flex flex-row gap-4'>
            <div className='w-1/4'></div>
            <div className='w-3/4 space-y-5'>
              <CustomComboBox
                control={form.control}
                name='province'
                label='Tỉnh/Thành phố'
                options={provinceOptions}
                labelClassname='text-xs'
                selectClassname='w-full'
                contentClassname='max-h-[200px] overflow-y-auto'
                formMessageClassname='text-xs'
                placeholder='Chọn tỉnh/thành phố'
              />

              <CustomComboBox
                control={form.control}
                name='district'
                label='Quận/Huyện'
                options={districtOptions}
                labelClassname='text-xs'
                selectClassname='w-full'
                contentClassname='max-h-[200px] overflow-y-auto'
                formMessageClassname='text-xs'
                placeholder='Chọn quận/huyện'
              />

              <CustomComboBox
                control={form.control}
                name='ward'
                label='Phường/Xã'
                options={wardOptions}
                labelClassname='text-xs'
                selectClassname='w-full'
                contentClassname='max-h-[200px] overflow-y-auto'
                formMessageClassname='text-xs'
                placeholder='Chọn phường/xã'
              />
            </div>
          </div>
        </div>
        <div className='flex flex-row items-center justify-center gap-2'>
          <Button variant='default'>Thêm</Button>
        </div>
      </form>
    </Form>
  );
}
