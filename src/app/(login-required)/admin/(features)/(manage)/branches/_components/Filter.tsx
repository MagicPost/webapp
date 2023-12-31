'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import CustomSelect from '@/components/main/CustomSelect';
import CustomInput from './FormInput';
import { provinces } from '@/constants/geography';
import { useEffect, useMemo } from 'react';

const formSchema = z.object({
  province: z.string().optional(),
  district: z.string().optional(),
  branchAddress: z.string().optional(),
});

export const Filter = () => {
  const form = useForm<z.infer<typeof formSchema>>();
  const onSubmit = (data: z.infer<typeof formSchema>) => console.log(data);

  useEffect(() => {
    form.setValue('district', undefined);
  }, [form.watch('province')]);

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

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className='flex w-full flex-col gap-4 rounded-md bg-yellow-100 p-4 shadow-sm md:flex-row md:items-center'
      >
        <strong> Bộ lọc: </strong>
        <div>
          <CustomSelect
            name='province'
            control={form.control}
            options={provinceOptions}
            placeholder='Tỉnh/Thành phố'
            selectClassname='w-full border-orange-300'
          />
        </div>
        <div>
          <CustomSelect
            name='district'
            control={form.control}
            options={districtOptions}
            placeholder='Quận/Huyện'
            selectClassname='w-full border-orange-300'
          />
        </div>

        <Label
          htmlFor='branchAddress'
          className='flex w-full items-center gap-2 rounded-md border border-orange-600 bg-white px-2 md:ml-auto md:w-[300px]'
        >
          <CustomInput
            name='branchAddress'
            control={form.control}
            placeholder='Tên, địa chỉ, mã bưu chính'
            containerClassname='w-full'
            inputClassname='w-full border-0'
          />
          <Search size={16} />
        </Label>
      </form>
    </Form>
  );
};
