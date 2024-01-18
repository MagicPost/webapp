'use client';

import WrappedOrderChart from './WrappedOrderChart';
import { useForm } from 'react-hook-form';
import { DisplayCollectionPointDTO } from '@/dtos/branches/collection-point.dto';
import CustomComboBox from '@/components/main/CustomCombobox';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import {
  CollectionPointStats,
  getCollectionPointStats,
} from '@/actions/statistics/collection-points/getCollectionPointStats';
import WrappedKpiCard from './WrappedKpiCard';
import Loading from '@/components/main/Loading';
import Empty from '@/components/main/Empty';

export default function CollectionPointTab({
  collectionPoints,
}: {
  collectionPoints: DisplayCollectionPointDTO[];
}) {
  const form = useForm({
    defaultValues: {
      branchId: '',
    },
  });

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['collection-point-stats', form.watch('branchId')],
    queryFn: () => {
      return new Promise((resolve, reject) => {
        getCollectionPointStats(form.watch('branchId'))
          .then((res) => {
            if (!res.ok) throw new Error(res.message);
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    enabled: false,
  });

  const inputData = data as CollectionPointStats;

  const onSubmit = (formData: { branchId: string }) => {
    if (formData.branchId === '') return;
    refetch();
  };

  return (
    <div className='mt-4'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mx-auto mb-4 flex max-w-[500px] flex-col items-end justify-center gap-2 text-center sm:flex-row'
        >
          <CustomComboBox
            control={form.control}
            name='branchId'
            label='Bộ lọc'
            containerClassname='w-full flex flex-row items-center justify-between gap-4'
            contentClassname='max-h-[280px] overflow-y-auto'
            labelClassname='w-1/4'
            selectClassname='w-3/4'
            options={collectionPoints.map((cp) => ({
              label: cp.name,
              value: cp._id,
            }))}
            placeholder='Chọn điểm tập kết'
            required
          />
          <Button variant='default' type='submit' disabled={form.watch('branchId') === ''}>
            Áp dụng
          </Button>
        </form>
      </Form>

      {isLoading && <Loading text='Đang tải' className='mt-12' />}
      {error && <Empty message='Không có dữ liệu' className='mt-12' />}
      {!!inputData && (
        <>
          <WrappedKpiCard data={inputData} />
          <div className='mt-8 flex w-full flex-row gap-2'>
            <div className='flex flex-1 flex-col'>
              <WrappedOrderChart data={inputData} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
