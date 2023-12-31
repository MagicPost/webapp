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
import { useMemo } from 'react';

export const clientFormSchema = z.object({
  phone: z.string().refine(validator.isMobilePhone, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ').or(z.literal('')),
  fullname: z.string().min(1, 'Không được để trống!'),
  address: z.string().min(1, 'Không được để trống!'),
  province: z.string().min(1, 'Không được để trống!'),
  district: z.string().min(1, 'Không được để trống!'),
  ward: z.string().min(1, 'Không được để trống!'),
});

export const packageFormSchema = z.object({
  type: z.nativeEnum(PackageTypes),
  specialNotes: z.object({
    [SpecialProperties.HIGHVALUE]: z.boolean(),
    [SpecialProperties.FRAGILE]: z.boolean(),
    [SpecialProperties.LIQUID]: z.boolean(),
    [SpecialProperties.PERISHABLE]: z.boolean(),
    [SpecialProperties.BULKY]: z.boolean(),
  }),
  items: z.array(
    z.object({
      name: z.string().min(1, 'Không được để trống!'),
      quantity: z.number().positive('Phải lớn hơn 0!'),
      weight: z.number().positive('Phải lớn hơn 0!'),
      price: z.number().positive('Phải lớn hơn 0!'),
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
      specialNotes: {
        [SpecialProperties.HIGHVALUE]: false,
        [SpecialProperties.FRAGILE]: false,
        [SpecialProperties.LIQUID]: false,
        [SpecialProperties.PERISHABLE]: false,
        [SpecialProperties.BULKY]: false,
      },
      items: [
        {
          name: '',
          weight: 0,
          quantity: 0,
          price: 0,
        },
      ],
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
      pickupTime: PickupTime.ALL_DAY,
    },
    mode: 'onBlur',
  });

  const totalPackageWeight = useMemo(() => {
    return Math.max(
      0,
      packageForm.watch('items').reduce((acc, item) => acc + item.weight * item.quantity, 0)
    );
  }, [JSON.stringify(packageForm.watch('items'))]);

  const totalPackagePrice = useMemo(() => {
    return Math.max(
      0,
      packageForm.watch('items').reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
  }, [JSON.stringify(packageForm.watch('items'))]);

  const totalItemNumber = useMemo(() => {
    return Math.max(
      0,
      packageForm.watch('items').reduce((acc, item) => acc + item.quantity, 0)
    );
  }, [JSON.stringify(packageForm.watch('items'))]);

  const onSubmit = async () => {
    console.log(serviceForm.getValues());

    senderForm.handleSubmit((senderFormData) => {
      receiverForm.handleSubmit((receiverFormData) => {
        packageForm.handleSubmit((packageFormData) => {
          serviceForm.handleSubmit((serviceFormData) => {
            console.log(senderFormData);
            console.log(receiverFormData);
            console.log(packageFormData);
            console.log(serviceFormData);
          })();
        })();
      })();
    })();
  };

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
            <SectionWrapper
              title='Thông tin đơn hàng'
              footer={
                <div className='flex flex-row justify-end'>
                  <div className='flex flex-col gap-2 font-semibold'>
                    <div className='flex flex-row justify-between gap-44'>
                      <div>Tổng khối lượng</div>
                      <div>{totalPackageWeight} (g)</div>
                    </div>
                    <div className='flex flex-row justify-between'>
                      <div>Tổng giá trị</div>
                      <div>{totalPackagePrice} (VNĐ)</div>
                    </div>
                    <div className='flex flex-row justify-between'>
                      <div>Tổng số lượng</div>
                      <div>{totalItemNumber}</div>
                    </div>
                  </div>
                </div>
              }
            >
              <PackageForm form={packageForm} />
            </SectionWrapper>

            <SectionWrapper title='Chọn dịch vụ'>
              <ServiceForm form={serviceForm} totalPackagePrice={totalPackagePrice} />
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
          <Button onClick={onSubmit}>Hoàn tất</Button>
        </div>
      </div>
    </>
  );
}

function SectionWrapper({
  title,
  children,
  footer,
}: {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className={`rounded-lg border border-red-500 ${footer ? 'pb-4' : 'pb-6'}`}>
      <div className='border-b border-red-500 px-4 py-2'>
        <h2 className='font-semibold uppercase'>{title}</h2>
      </div>
      {children}

      {footer && <div className='mt-4 border-t border-red-500 px-4 py-2'>{footer}</div>}
    </div>
  );
}
