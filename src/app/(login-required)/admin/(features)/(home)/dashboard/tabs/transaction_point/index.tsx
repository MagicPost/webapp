'use client';

import dynamic from 'next/dynamic';
import { DisplayTransactionPointDTO } from '@/dtos/branches/transaction-point.dto';
import WrappedKpiCard from './WrappedKpiCard';
import WrappedOrderChart from './WrappedOrderChart';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import {
  TransactionPointStatsByMonth,
  getTransactionStatsOfNewestMonth,
} from '@/actions/statistics/transaction-points/getTransactionStatsOfNewestMonth';
import { DisplayCollectionPointDTO } from '@/dtos/branches/collection-point.dto';
import CustomComboBox from '@/components/main/CustomCombobox';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import Loading from '@/components/main/Loading';
import Empty from '@/components/main/Empty';
import { useEffect } from 'react';
import {
  TransactionPointStatsByWeek,
  getTransactionStatsOfWeek,
} from '@/actions/statistics/transaction-points/getTransactionStatsOfWeek';
import {
  TransactionStatsOfYear,
  getTransactionStatsOfYear,
} from '@/actions/statistics/transaction-points/getTransactionStatsOfYear';
import { ActionResponse } from '@/actions/_helpers/types';

const TransitChart = dynamic(() => import('@/components/dashboard/TransitChart'), { ssr: false });

type Branches = {
  collectionPoints: DisplayCollectionPointDTO[];
  transactionPoints: DisplayTransactionPointDTO[];
};

export default function TransactionPointTab({ branches }: { branches: Branches }) {
  const form = useForm({
    defaultValues: {
      collectionPointId: '',
      transactionPointId: '',
    },
  });

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['transaction-point-stats', form.watch('transactionPointId')],
    queryFn: () => {
      const transactionPointId = form.watch('transactionPointId');
      return new Promise((resolve, reject) => {
        Promise.all([
          getTransactionStatsOfNewestMonth(transactionPointId),
          getTransactionStatsOfWeek(transactionPointId),
          getTransactionStatsOfYear(transactionPointId),
        ])
          .then((data: ActionResponse[]) => {
            if (!data[0].ok) return reject(data[0].message);
            if (!data[1].ok) return reject(data[1].message);
            if (!data[2].ok) return reject(data[2].message);
            resolve([data[0].data, data[1].data, data[2].data]);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    enabled: false,
  });

  useEffect(() => {
    form.setValue('transactionPointId', '');
  }, [form.watch('collectionPointId')]);

  console.log(data);

  const generalStatsData = (data as any)?.[0] as TransactionPointStatsByMonth;
  const orderOfWeekStatsData = (data as any)?.[1] as TransactionPointStatsByWeek;
  const orderOfYearStatsData = (data as any)?.[2] as TransactionStatsOfYear;

  const onSubmit = (formData: { transactionPointId: string }) => {
    if (formData.transactionPointId === '') return;
    refetch();
  };

  return (
    <div className='mt-4'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mx-auto mb-4 flex max-w-[600px] flex-col items-end justify-center gap-2 text-center sm:flex-row'
        >
          <div className='flex w-full flex-col gap-2'>
            <CustomComboBox
              control={form.control}
              name='collectionPointId'
              label='Điểm tập kết'
              containerClassname='w-full flex flex-row items-center justify-between gap-4'
              contentClassname='max-h-[280px] overflow-y-auto'
              labelClassname='w-1/4'
              selectClassname='w-3/4'
              options={branches.collectionPoints.map((cp) => ({
                label: cp.name,
                value: cp._id,
              }))}
              placeholder='Chọn điểm tập kết'
              required
            />

            <CustomComboBox
              control={form.control}
              name='transactionPointId'
              label='Điểm giao dịch'
              containerClassname='w-full flex flex-row items-center justify-between gap-4'
              contentClassname='max-h-[280px] overflow-y-auto'
              labelClassname='w-1/4'
              selectClassname='w-3/4'
              options={branches.transactionPoints
                .filter((tp) => tp.collectionPoint === form.watch('collectionPointId'))
                .map((cp) => ({
                  label: cp.name,
                  value: cp._id,
                }))}
              placeholder='Chọn điểm tập kết'
              required
            />
          </div>

          <Button
            variant='default'
            type='submit'
            disabled={form.watch('transactionPointId') === ''}
          >
            Áp dụng
          </Button>
        </form>
      </Form>

      {isLoading && <Loading text='Đang tải' className='mt-12' />}
      {error && <Empty message='Không có dữ liệu' className='mt-12' />}

      {!!data && (
        <>
          <WrappedKpiCard data={generalStatsData} />
          <div className='mt-8 flex w-full flex-col gap-2 md:flex-row'>
            <div className='flex flex-1 flex-col rounded-lg border p-4'>
              <WrappedOrderChart data={orderOfYearStatsData} />
            </div>
            <div className='flex w-full flex-col gap-4 rounded-lg border p-4 md:w-1/2'>
              <TransitChart
                legend={{
                  title: 'Thống kê trạng thái vận đơn trong tuần',
                }}
                data={{
                  series: [
                    orderOfWeekStatsData.receivedPackages,
                    orderOfWeekStatsData.sentPackages,
                    orderOfWeekStatsData.deliveredPackages,
                    orderOfWeekStatsData.resentPackages,
                  ],
                  labels: ['Đơn tiếp nhận', 'Đơn tạo', 'Đơn đã giao', 'Đơn hoàn trả'],
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
