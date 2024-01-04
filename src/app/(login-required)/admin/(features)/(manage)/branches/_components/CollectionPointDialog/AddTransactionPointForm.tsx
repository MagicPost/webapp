'use client';

import { createTransactionPoint } from '@/actions/branch/createTransactionPoint';
import CustomComboBox from '@/components/main/CustomCombobox';
import CustomInputField from '@/components/main/CustomInputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { provinces } from '@/constants/geography';
import { GetCollectionPointDTO } from '@/dtos/branches/collection-point.dto';
import {
  CreateTransactionPointDTO,
  GetTransactionPointDTO,
} from '@/dtos/branches/transaction-point.dto';
import { postalCodeRegex } from '@/lib/regex';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Không được để trống!'),
  address: z.string().min(1, 'Không được để trống!'),
  district: z.string().min(1, 'Không được để trống!'),
  ward: z.string().min(1, 'Không được để trống!'),
  postalCode: z.string().regex(postalCodeRegex, 'Mã bưu chính không hợp lệ, phải gồm 6 chữ số!'),
});

export default function AddTransactionPointForm({
  collectionPoint,
}: {
  collectionPoint: GetCollectionPointDTO;
}) {
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      district: '',
      postalCode: '',
    },
    mode: 'onSubmit',
  });

  useEffect(() => {
    form.setValue('ward', '');
  }, [form.watch('district')]);

  const province = useMemo(() => {
    return provinces.filter((province) => province.name === collectionPoint.province)[0];
  }, [collectionPoint.province]);

  const districtOptions = useMemo(() => {
    if (!province) return [];
    return (
      province?.districts.map((district) => {
        return { label: district.name, value: district.name };
      }) || []
    );
  }, []);

  const wardOptions = useMemo(() => {
    if (!province || !form.watch('district')) return [];
    return (
      province?.districts
        .filter((district) => district.name === form.watch('district'))[0]
        ?.wards.map((ward) => {
          return { label: ward.name, value: ward.name };
        }) || []
    );
  }, [province, form.watch('district')]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const payload: CreateTransactionPointDTO = {
      ...data,
      province: collectionPoint.province,
      collectionPoint: collectionPoint._id,
    };
    const res = await createTransactionPoint(payload);
    if (!res?.ok) {
      toast.error(res?.message);
    } else {
      toast.success(res?.message);
      queryClient.setQueryData(
        ['collectionPoint', collectionPoint._id],
        (prev: GetTransactionPointDTO[]) => [...prev, res?.data]
      );
      form.reset();
    }
  };

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
          <form className='flex flex-col gap-0 space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='max-h-[22rem] overflow-auto'>
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
            </div>

            <div className='flex flex-row items-center justify-center gap-2'>
              <Button type={'submit'} variant='default'>
                Thêm
              </Button>
              <Button
                variant='outline'
                type='button'
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
