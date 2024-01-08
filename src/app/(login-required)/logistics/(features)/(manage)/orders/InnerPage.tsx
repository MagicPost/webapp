'use client';

import { Button } from '@/components/ui/button';
import {
  BranchTypes,
  PackageTypes,
  Payer,
  PickupTime,
  SpecialProperties,
  TransitServiceTypes,
} from '@/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import ClientForm from './forms/ClientForm';
import PackageForm from './forms/PackageForm';
import ServiceForm from './forms/ServiceForm';
import { clientFormSchema, packageFormSchema, serviceFormSchema } from '@/dtos/package/schema';
import { createPackage } from '@/actions/package/createPackage';
import { numberToVnd } from '@/lib/currency';
import { formatDistance, measureDistance } from '@/lib/transport-route';
import { getMainPostages, getPlusPostage } from '@/lib/postage';
import { CreatePackageDTO } from '@/dtos/package/package.dto';
import { RefreshCcw } from 'lucide-react';
import CompleteButton from './CompleteButton';
import { ActionResponse } from '@/actions/_helpers/types';
import { promisify } from './promisify';

export default function InnerPage({
  branch,
}: {
  branch: {
    _id: string;
    district: string;
    province: string;
    type: BranchTypes;
    name: string;
  };
}) {
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
          value: 0,
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

  const totalPackageValues = useMemo(() => {
    return Math.max(
      0,
      packageForm.watch('items').reduce((acc, item) => acc + item.value * item.quantity, 0)
    );
  }, [JSON.stringify(packageForm.watch('items'))]);

  const totalItemNumber = useMemo(() => {
    return Math.max(
      0,
      packageForm.watch('items').reduce((acc, item) => acc + item.quantity, 0)
    );
  }, [JSON.stringify(packageForm.watch('items'))]);

  const plusServicePostages = useMemo(() => {
    const { insurance, refund } = serviceForm.watch('plus');
    return getPlusPostage({
      value: totalPackageValues,
      services: {
        insurance,
        refund,
      },
    });
  }, [totalPackageValues, serviceForm.watch('plus').insurance, serviceForm.watch('plus').refund]);

  const [distance, setDistance] = useState(0);
  useEffect(() => {
    let active = true;
    load();
    return () => {
      active = false;
    };

    async function load() {
      const { province: receiverProvince } = receiverForm.watch();
      if (!receiverProvince) return;
      const _distance = await measureDistance({
        sourceProvince: branch.province,
        destProvince: receiverProvince,
      });
      if (active) {
        setDistance(_distance);
      }
    }
  }, [receiverForm.watch('province')]);

  const mainPostages = useMemo(() => {
    const { transit } = serviceForm.watch();
    return getMainPostages({
      distance,
      weight: totalPackageWeight,
      transit,
      province: {
        source: branch.province,
        destination: receiverForm.watch('province'),
      },
    });
  }, [distance, totalPackageWeight, serviceForm.watch('transit'), receiverForm.watch('province')]);

  const [refresh, setRefresh] = useState(false);

  const onSubmit = useCallback<() => Promise<ActionResponse>>(async () => {
    try {
      const senderFormData = await promisify(senderForm.handleSubmit);
      const receiverFormData = await promisify(receiverForm.handleSubmit);
      const packageFormData = await promisify(packageForm.handleSubmit);
      const serviceFormData = await promisify(serviceForm.handleSubmit);

      const res = await createPackage({
        sender: senderFormData,
        receiver: receiverFormData,
        package: packageFormData,
        service: serviceFormData,
        distance,
        postages: {
          main: mainPostages,
          plus: plusServicePostages,
        },
        branch,
      } satisfies CreatePackageDTO);

      return res;
    } catch (err) {
      return {
        ok: false,
        message: 'Thông tin không hợp lệ',
      };
    }
  }, []);

  // console.log('Reset ' + reset, onSubmit);

  return (
    <>
      <div className='mt-12 w-full p-4 lg:mt-0'>
        <div className='mb-8 flex w-full flex-row items-center justify-between'>
          <h1 className='text-2xl font-bold'>Tạo đơn hàng</h1>
          <Button
            variant={'ghost'}
            className='space-x-2'
            onClick={() => {
              senderForm.reset();
              receiverForm.reset();
              packageForm.reset();
              serviceForm.reset();
              setDistance(0);
              setRefresh(!refresh);
            }}
          >
            <RefreshCcw className='h-4 w-4' /> <span>Làm mới</span>
          </Button>
        </div>

        <div className='mb-16 flex flex-col gap-8 lg:flex-row'>
          <div className='flex w-full flex-col gap-4 lg:w-2/5'>
            <SectionWrapper title='Thông tin người gửi'>
              <ClientForm form={senderForm} />
            </SectionWrapper>

            <SectionWrapper title='Thông tin người nhận'>
              <ClientForm form={receiverForm} />
            </SectionWrapper>
          </div>

          <div className='flex w-full flex-col gap-4 lg:w-3/5'>
            <SectionWrapper
              title='Thông tin đơn hàng'
              footer={
                <div className='flex flex-row justify-end'>
                  <div className='flex flex-col gap-2 font-semibold'>
                    <div className='flex flex-row justify-between gap-44'>
                      <div>Tổng khối lượng</div>
                      <div>{totalPackageWeight.toLocaleString('vi-VN')} (g)</div>
                    </div>
                    <div className='flex flex-row justify-between'>
                      <div>Tổng giá trị</div>
                      <div>{numberToVnd(totalPackageValues)}</div>
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
              <ServiceForm form={serviceForm} totalPackageValues={totalPackageValues} />
            </SectionWrapper>
          </div>
        </div>
      </div>

      <div className='item-center sticky bottom-0 z-10 flex h-24 flex-row items-center justify-between gap-2 overflow-auto border bg-white px-4 py-2 lg:px-20'>
        <div className='flex h-full max-w-[800px] flex-1 flex-row flex-wrap items-center justify-between gap-1  text-xs lg:p-2 lg:text-sm'>
          <div className='flex basis-[4rem] flex-col min-[400px]:basis-[8rem]'>
            <span>Khoảng cách:</span>
            <span className='text-sm font-semibold sm:text-base'>{formatDistance(distance)}</span>
          </div>

          <div className='flex basis-[4rem] flex-col min-[400px]:basis-[8rem]'>
            <span>Tổng cước:</span>
            <span className='text-sm font-semibold sm:text-base'>
              {numberToVnd(mainPostages + plusServicePostages)}
            </span>
          </div>

          <div className='flex basis-[4rem] flex-col min-[400px]:basis-[8rem]'>
            <span>Tiền thu người gửi:</span>
            <span className='text-sm font-semibold sm:text-base'>
              {numberToVnd(
                serviceForm.watch('payer') === Payer.SENDER ? mainPostages + plusServicePostages : 0
              )}
            </span>
          </div>

          <div className='flex basis-[4rem] flex-col max-[335px]:basis-[18rem] min-[400px]:basis-[14rem]'>
            <span>Tiền thu người nhận (+ Thu hộ)</span>
            <span className='text-sm font-semibold sm:text-base'>
              {numberToVnd(
                serviceForm.watch('COD') +
                  (serviceForm.watch('payer') === Payer.RECEIVER
                    ? mainPostages + plusServicePostages
                    : 0)
              )}
            </span>
          </div>
        </div>

        <div>{<CompleteButton onSubmit={onSubmit} refresh={refresh} />}</div>
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
