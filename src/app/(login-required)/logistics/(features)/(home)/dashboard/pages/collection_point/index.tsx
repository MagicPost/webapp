import {
  CollectionPointStats,
  getCollectionPointStats,
} from '@/actions/statistics/collection-points/getCollectionPointStats';
import WrappedKpiCard from './WrappedKpiCard';
import WrappedOrderChart from './WrappedOrderChart';

export default async function CollectionPointPage({ branchId }: { branchId: string }) {
  const res = await getCollectionPointStats(branchId);
  const collectionPointStatsData = res.data as CollectionPointStats;

  return (
    <div className='mt-4'>
      <WrappedKpiCard data={collectionPointStatsData} />
      <div className='mt-8 flex w-full flex-row gap-2'>
        <div className='flex flex-1 flex-col'>
          {' '}
          <WrappedOrderChart data={collectionPointStatsData} />
        </div>
      </div>
    </div>
  );
}
