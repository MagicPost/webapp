import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { clientFormSchema } from './page';
import { Input } from '@/components/ui/input';
import CustomComboBox from '@/components/main/CustomCombobox';
import { provinces } from '@/constants/geography';
import { useEffect, useMemo } from 'react';

export default function ClientForm({
  form,
}: {
  form: UseFormReturn<z.infer<typeof clientFormSchema>>;
}) {
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
    console.log(provinces.filter((province) => province.codename === form.watch('province'))[0]);
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

  return (
    <Form {...form}>
      <form className='space-y-4 px-4 pt-6'>
        <CustomInputField
          form={form}
          name='phone'
          label='Số điện thoại'
          placeholder='Nhập số điện thoại'
          type='text'
        />

        <CustomInputField
          form={form}
          name='fullname'
          label='Họ tên'
          placeholder='Nhập họ tên'
          type='text'
        />

        <CustomInputField
          form={form}
          name='email'
          label='Email'
          placeholder='Nhập email'
          type='email'
        />

        <CustomInputField
          form={form}
          name='address'
          label='Địa chỉ'
          placeholder='Nhập địa chỉ'
          type='text'
        />

        <div className='mt-2 flex flex-row gap-4'>
          <div className='w-1/4'></div>
          <div className='w-3/4 space-y-5'>
            <CustomComboBox
              control={form.control}
              name='province'
              label='Tỉnh/Thành phố'
              options={provinceOptions}
              labelClassName='text-xs'
              selectClassName='w-full'
              contentClassName='max-h-[200px] overflow-y-auto'
              placeholder='Chọn tỉnh/thành phố'
            />

            <CustomComboBox
              control={form.control}
              name='district'
              label='Quận/Huyện'
              options={districtOptions}
              labelClassName='text-xs'
              selectClassName='w-full'
              contentClassName='max-h-[200px] overflow-y-auto'
              placeholder='Chọn quận/huyện'
            />

            <CustomComboBox
              control={form.control}
              name='ward'
              label='Phường/Xã'
              options={wardOptions}
              labelClassName='text-xs'
              selectClassName='w-full'
              contentClassName='max-h-[200px] overflow-y-auto'
              placeholder='Chọn phường/xã'
            />
          </div>
        </div>
      </form>
    </Form>
  );
}

function CustomInputField({
  form,
  name,
  label,
  placeholder,
  type = 'text',
}: {
  form: UseFormReturn<z.infer<typeof clientFormSchema>>;
  name: any;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-row items-center justify-between gap-4'>
          <FormLabel className='w-1/4'>
            {label} <span className='text-red-600'>*</span>
          </FormLabel>
          <div className='flex w-3/4 flex-col gap-1'>
            <FormControl>
              <Input className='w-full' placeholder={placeholder} type={type} {...field} />
            </FormControl>
            <FormMessage className='text-xs' />
          </div>
        </FormItem>
      )}
    />
  );
}
