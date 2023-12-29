'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import CustomSelect from './FormSelect';
import CustomInput from './FormInput';

const formSchema = z.object({
  province: z.string().optional(),
  district: z.string().optional(),
  collectionPoint: z.string().optional(),
  branchAddress: z.string().optional(),
});

export const Filter = () => {
  const form = useForm<z.infer<typeof formSchema>>();
  const onSubmit = (data: z.infer<typeof formSchema>) => console.log(data);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full flex-col gap-4 rounded-md border bg-white p-4 shadow-sm md:flex-row md:items-center'
      >
        <strong> Bộ lọc: </strong>
        <div>
          <CustomSelect
            name='province'
            control={form.control}
            options={[
              { label: 'Hà Nội', value: 'hanoi' },
              { label: 'Hồ Chí Minh', value: 'hochiminh' },
            ]}
            placeholder='Tỉnh/Thành phố'
          />
        </div>
        <div>
          <CustomSelect
            name='district'
            control={form.control}
            options={[
              { label: 'Tây Hồ', value: 'tayho' },
              { label: 'Ba Đình', value: 'badinh' },
            ]}
            placeholder='Quận/Huyện'
          />
        </div>
        <div>
          <CustomSelect
            name='collectionPoint'
            control={form.control}
            options={[
              { label: 'Cầu Giấy', value: 'caugiay' },
              { label: 'Đống Đa', value: 'dongda' },
            ]}
            placeholder='Điểm tập kết'
          />
        </div>
        <Label
          htmlFor='branchAddress'
          className='flex w-full items-center gap-2 rounded-md border px-2 md:ml-auto md:w-[300px]'
        >
          <CustomInput
            name='branchAddress'
            control={form.control}
            placeholder='Địa chỉ'
            containerClassName='w-full'
            inputClassName='w-full border-0'
          />
          <Search size={16} />
        </Label>
      </form>
    </Form>
  );
};
