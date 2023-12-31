'use client';

import CustomComboBox from '@/components/main/CustomCombobox';
import CustomInputField from '@/components/main/CustomInputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { provinces } from '@/constants/geography';
import { postalCodeRegex } from '@/lib/regex';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Không được để trống!'),
  address: z.string().min(1, 'Không được để trống!'),
  district: z.string().min(1, 'Không được để trống!'),
  province: z.string().min(1, 'Không được để trống!'),
  ward: z.string().min(1, 'Không được để trống!'),
  postalCode: z.string().regex(postalCodeRegex, 'Mã bưu chính không hợp lệ'),
});

export default function NewBranchForm() {
  const [showForm, setShowForm] = useState(false);

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

  return (
    <div>
      {!showForm && (
        <Button
          variant={'outline'}
          className='flex h-16 w-full flex-row items-center justify-center rounded-lg border border-dashed border-gray-700 text-base font-semibold'
          onClick={() => setShowForm(true)}
        >
          + Thêm điểm giao dịch
        </Button>
      )}

      {showForm && (
        <Form {...form}>
          <form className='flex flex-col gap-0 space-y-8'>
            <div className='max-h-[21rem] overflow-auto'>
              <div className='flex-1'>
                <CustomInputField
                  form={form}
                  name='name'
                  label='Tên'
                  placeholder='Nhập tên điểm tập kết'
                  type='text'
                />

                <CustomInputField
                  form={form}
                  name='postalCode'
                  label='Mã bưu chính'
                  placeholder='Nhập mã bưu chính'
                  type='text'
                />
              </div>

              <div className='flex-1'>
                <CustomInputField
                  form={form}
                  name='address'
                  label='Địa chỉ'
                  placeholder='Nhập địa chỉ cụ thể'
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
                      formMessageClassname='text-xs'
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
                      formMessageClassname='text-xs'
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
                      formMessageClassname='text-xs'
                      placeholder='Chọn phường/xã'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-row items-center justify-center gap-2'>
              <Button type={'submit'} variant='default'>
                Thêm
              </Button>
              <Button
                variant='outline'
                onClick={() => {
                  form.reset();
                  setShowForm(false);
                }}
              >
                Hủy
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
