'use client';

import { z } from 'zod';
import ClientForm from './ClientForm';
import validator from 'validator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PackageTypes,
  Payer,
  PickupTime,
  SpecialProperties,
  TransitServiceTypes,
} from '@/constants';
import PackageForm from './PackageForm';
import ServiceForm from './ServiceForm';
import { Button } from '@/components/ui/button';

export const clientFormSchema = z.object({
  phone: z.string().refine(validator.isMobilePhone, 'Số điện thoại không hợp lệ').or(z.literal('')),
  email: z.string().email('Email không hợp lệ').or(z.literal('')),
  fullname: z.string(),
  address: z.string(),
  province: z.string(),
  district: z.string(),
  ward: z.string(),
});

export const packageFormSchema = z.object({
  type: z.nativeEnum(PackageTypes),
  weight: z.number().positive('Khối lượng phải là số dương'),
  length: z.number().positive('Chiều dài phải là số dương'),
  width: z.number().positive('Chiều rộng phải là số dương'),
  height: z.number().positive('Chiều cao phải là số dương'),
  specialNotes: z.object({
    [SpecialProperties.HIGHVALUE]: z.boolean(),
    [SpecialProperties.FRAGILE]: z.boolean(),
    [SpecialProperties.LIQUID]: z.boolean(),
    [SpecialProperties.PERISHABLE]: z.boolean(),
    [SpecialProperties.BULKY]: z.boolean(),
  }),
  items: z.array(
    z.object({
      name: z.string(),
      quantity: z.number().positive('Số lượng phải là số dương'),
      price: z.number().positive('Giá phải là số dương'),
    })
  ),
});

export const serviceFormSchema = z.object({
  transit: z.nativeEnum(TransitServiceTypes),
  plus: z.object({
    insurance: z.boolean(),
    refund: z.boolean(),
  }),
  note: z.string(),
  COD: z.number().min(0, 'Số tiền phải lớn hơn 0'),
  payer: z.nativeEnum(Payer),
  pickupTime: z.nativeEnum(PickupTime),
});

export default function OrdersPage() {
  const senderForm = useForm<z.infer<typeof clientFormSchema>>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      phone: '',
      fullname: '',
      address: '',
      email: '',
    },
    mode: 'onBlur',
  });

  const receiverForm = useForm<z.infer<typeof clientFormSchema>>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      phone: '',
      fullname: '',
      address: '',
      email: '',
    },
    mode: 'onBlur',
  });

  const packageForm = useForm<z.infer<typeof packageFormSchema>>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: {
      type: PackageTypes.PARCEL,
      weight: 0,
      length: 0,
      width: 0,
      height: 0,
      specialNotes: {
        [SpecialProperties.HIGHVALUE]: false,
        [SpecialProperties.FRAGILE]: false,
        [SpecialProperties.LIQUID]: false,
        [SpecialProperties.PERISHABLE]: false,
        [SpecialProperties.BULKY]: false,
      },
      items: [],
    },
    mode: 'onBlur',
  });

  const serviceForm = useForm<z.infer<typeof serviceFormSchema>>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      transit: TransitServiceTypes.STANDARD,
      plus: {
        insurance: false,
        refund: false,
      },
      note: '',
      COD: 0,
      payer: Payer.SENDER,
      pickupTime: PickupTime.MORNING,
    },
    mode: 'onBlur',
  });

  return (
    <>
      <div className='w-full p-4'>
        <h1 className='mb-8 text-xl font-semibold'>Tạo đơn hàng</h1>

        <div className='mb-16 flex flex-row gap-8'>
          <div className='flex w-2/5 flex-col gap-4'>
            <SectionWrapper title='Thông tin người gửi'>
              <ClientForm form={senderForm} />
            </SectionWrapper>

            <SectionWrapper title='Thông tin người nhận'>
              <ClientForm form={receiverForm} />
            </SectionWrapper>
          </div>

          <div className='flex w-3/5 flex-col gap-4'>
            <SectionWrapper title='Thông tin đơn hàng'>
              <PackageForm form={packageForm} />
            </SectionWrapper>

            <SectionWrapper title='Chọn dịch vụ'>
              <ServiceForm form={serviceForm} />
            </SectionWrapper>
          </div>
        </div>
      </div>
      <div className='item-center sticky bottom-0 z-10 flex h-24 flex-row justify-between border bg-white'>
        <div className=''>
          <div>Tổng cước</div>
        </div>
        <div className=''>
          <div>Tiền thu hộ</div>
        </div>

        <div className=''>
          <div>Tiền thu người gửi</div>
        </div>
        <div>Thời gian dự kiến</div>

        <div>
          <Button>Hoàn tất</Button>
        </div>
      </div>
    </>
  );
}

function SectionWrapper({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className='rounded-lg border border-red-500 pb-6'>
      <div className='border-b border-red-500 px-4 py-2'>
        <h2 className='font-semibold uppercase'>{title}</h2>
      </div>
      {children}
    </div>
  );
}
