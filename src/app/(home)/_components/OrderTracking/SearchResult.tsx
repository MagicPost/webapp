'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import TransitProgress from './TransitProgress';
import { GetPackageDTO } from '@/dtos/package/package.dto';
import { getPackageById } from '@/actions/package/getPackageById';
import Loading from '@/components/main/Loading';
import Empty from '@/components/main/Empty';

export default function SearchResult({ packageId }: { packageId: string }) {
  const [packageData, setPackageData] = useState<GetPackageDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!packageId) return;
    let active = true;
    load();
    return () => {
      active = false;
    };
    async function load() {
      setLoading(true);
      if (!active) return;
      const res = await getPackageById({
        _id: packageId,
        include: {
          sentAt: true,
          receivedAt: true,
          creator: false,
          tracking: false,
        },
      });
      if (!res.ok) setError(true);
      setPackageData(res.data);
      console.log(res.data);
      setLoading(false);
    }
  }, [packageId]);

  if (loading) {
    return <Loading text={'Đang tải...'} className='mt-12' />;
  }

  if (error) {
    return <Empty message={'Có lỗi xảy ra!'} className='mt-12' />;
  }

  if (!packageData) {
    return <Empty message={'Không tìm thấy đơn hàng!'} className='mt-12' />;
  }

  return (
    <div className='w-full gap-4 space-y-8'>
      <div className='w-full flex-1 space-y-4'>
        <SearchResultHeading
          name='Thông tin đơn hàng:'
          tooltip={{
            trigger: <HelpCircle className='h-4 w-4' />,
            content: (
              <p className='sm:w-84 w-40 bg-gray-100 text-sm'>
                Vì lý do bảo mật, thông tin khách hàng sẽ không hiển thị đầy đủ. <br />
                Vui lòng tự xác nhận đơn hàng thuộc về bạn.
              </p>
            ),
          }}
        />

        <div className='flex flex-col gap-6 md:flex-row md:justify-between'>
          <div className='space-y-2 md:w-1/2 md:flex-1'>
            <FieldRow label='Mã đơn hàng:' value='123456789' />
            <FieldRow label='Tên đơn hàng' value='Máy đọc sách Kindle' />
            <FieldRow label='Ngày giờ gửi:' value='10:20:23 12/12/2021' />
            <FieldRow
              label='Trạng thái:'
              value={
                <span className='py-0.9 select-none rounded-full bg-green-300 px-4 text-sm font-semibold text-green-800'>
                  Đã giao
                </span>
              }
            />
          </div>

          <div className='space-y-2 md:w-1/2 md:flex-1'>
            <FieldRow label='Người gửi:' value='Lê Quang ****' />
            <FieldRow label='SĐT:' value='******7789' />
            <FieldRow label='Địa chỉ:' value='123 Đường ****, Quận XYZ, TP. HCM' />
            <FieldRow label='Người nhận:' value='Nguyễn Văn ****' />
            <FieldRow label='SĐT:' value='******7789' />
            <FieldRow label='Địa chỉ:' value='123 Đường ****, Quận XYZ, TP. HCM' />
          </div>
        </div>
      </div>

      <div className='space-y-8'>
        <SearchResultHeading name='Tiến trình chuyển phát:' />

        <div className='mx-auto flex w-full items-center justify-center'>
          <TransitProgress />
        </div>
      </div>
    </div>
  );
}

function SearchResultHeading({
  name,
  tooltip,
}: {
  name: string;
  tooltip?: {
    trigger: React.ReactNode;
    content: React.ReactNode | string;
  };
}) {
  return (
    <div className='flex flex-row gap-2'>
      <h3 className='text-lg font-semibold'>{name}</h3>
      {tooltip && (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger>{tooltip.trigger}</TooltipTrigger>
            <TooltipContent asChild>{tooltip.content}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}

function FieldRow({ label, value }: { label: string; value: string | number | React.ReactNode }) {
  return (
    <div className='flex flex-row gap-2'>
      <div className='w-2/5'>{label}</div>
      <div className='w-3/5 text-left'>{value}</div>
    </div>
  );
}
