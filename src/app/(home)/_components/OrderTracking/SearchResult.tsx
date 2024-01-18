'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import TransitProgress from './TransitProgress';
import { GetPackageDTO } from '@/dtos/package/package.dto';
import { getPackageById } from '@/actions/package/getPackageById';
import Loading from '@/components/main/Loading';
import Empty from '@/components/main/Empty';
import { getTimeString, getViLocaleDateString } from '@/lib/time';
import { hideInfo } from '@/lib/text';
import { PackageTrackingActions, PackageTrackingActionsMap } from '@/constants';
import { cn } from '@/lib/utils';

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
          tracking: true,
        },
      });
      if (!res.ok) setError(true);
      setPackageData(res.data);
      setLoading(false);
    }
  }, [packageId]);

  const packageName = useMemo(() => {
    return packageData?.items.reduce((acc, item) => {
      if (acc) return acc + ', ' + item.name;
      return item.name as string;
    }, '' as string);
  }, [packageData]);

  const packageStatus:
    | PackageTrackingActions.CREATED
    | PackageTrackingActions.CANCELLED
    | PackageTrackingActions.DELIVERING
    | PackageTrackingActions.DELIVERED
    | PackageTrackingActions.RESENT = useMemo(() => {
    let status = PackageTrackingActions.DELIVERING;
    for (const log of packageData?.tracking || []) {
      for (const action of log.actions) {
        if (
          action.type === PackageTrackingActions.CREATED ||
          action.type === PackageTrackingActions.CANCELLED ||
          action.type === PackageTrackingActions.DELIVERING ||
          action.type === PackageTrackingActions.DELIVERED ||
          action.type === PackageTrackingActions.RESENT
        )
          status = action.type;
        else if (
          action.type === PackageTrackingActions.ARRIVED ||
          action.type === PackageTrackingActions.DEPARTED
        )
          status = PackageTrackingActions.DELIVERING;
      }
    }
    return status;
  }, [packageData]);

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
              <span className='sm:w-84 block w-40 bg-gray-100 text-sm'>
                Vì lý do bảo mật, thông tin khách hàng sẽ không hiển thị đầy đủ. <br />
                Vui lòng tự xác nhận đơn hàng thuộc về bạn.
              </span>
            ),
          }}
        />

        <div className='flex flex-col gap-6 md:flex-row md:justify-between'>
          <div className='space-y-2 md:w-1/2 md:flex-1'>
            <FieldRow label='Mã đơn hàng:' value={packageData._id} />
            <FieldRow label='Tên đơn hàng' value={packageName} />
            <FieldRow
              label='Ngày giờ gửi:'
              value={`${getViLocaleDateString(packageData.createdAt)} ${getTimeString(
                packageData.createdAt
              )}`}
            />
            <FieldRow
              label='Trạng thái:'
              value={
                <span
                  className={cn('py-0.9 select-none rounded-full px-4 text-sm font-semibold', {
                    'bg-yellow-200 text-yellow-700':
                      packageStatus === PackageTrackingActions.CREATED,
                    'bg-red-200 text-red-600': packageStatus === PackageTrackingActions.CANCELLED,
                    'bg-yellow-200 text-yellow-800':
                      packageStatus === PackageTrackingActions.RESENT,
                    'bg-sky-200 text-sky-700': packageStatus === PackageTrackingActions.DELIVERING,
                    'bg-green-200 text-green-900':
                      packageStatus === PackageTrackingActions.DELIVERED,
                  })}
                >
                  {PackageTrackingActionsMap[packageStatus]}
                </span>
              }
            />
          </div>

          <div className='space-y-2 md:w-1/2 md:flex-1'>
            <FieldRow
              label='Người gửi:'
              value={hideInfo(packageData.sender.fullname, 'fullname')}
            />
            <FieldRow label='SĐT:' value={hideInfo(packageData.sender.phone, 'phone')} />
            <FieldRow label='Địa chỉ:' value={hideInfo(packageData.sender.address, 'address')} />
            <FieldRow
              label='Người nhận:'
              value={hideInfo(packageData.receiver.fullname, 'fullname')}
            />
            <FieldRow label='SĐT:' value={hideInfo(packageData.receiver.phone, 'phone')} />
            <FieldRow label='Địa chỉ:' value={hideInfo(packageData.receiver.address, 'address')} />
          </div>
        </div>
      </div>

      <div className='space-y-8'>
        <SearchResultHeading name='Tiến trình chuyển phát:' />

        <div className='mx-auto flex w-full items-center justify-center'>
          <TransitProgress tracking={packageData.tracking} />
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
