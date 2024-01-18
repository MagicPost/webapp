import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CountryTab from './tabs/country';
import CollectionPointTab from './tabs/collection_point';
import TransactionPointTab from './tabs/transaction_point';
import { getBasicBranches } from '@/actions/branch/getBasicBranches';
import { DisplayCollectionPointDTO } from '@/dtos/branches/collection-point.dto';
import { DisplayTransactionPointDTO } from '@/dtos/branches/transaction-point.dto';

type Branches = {
  collectionPoints: DisplayCollectionPointDTO[];
  transactionPoints: DisplayTransactionPointDTO[];
};

export default async function DashboardPage() {
  const branches: Branches = (
    await getBasicBranches({
      withCollectionPoints: true,
      withTransactionPoints: true,
    })
  )?.data;

  return (
    <div className='p-4'>
      <h1 className='mb-4 text-2xl font-bold'>Thống kê</h1>

      <Tabs defaultValue='country' className='w-full'>
        <TabsList className='my-12 flex h-full w-full flex-col md:my-4 md:flex-row'>
          <TabsTrigger value='country' className='w-full'>
            Toàn quốc
          </TabsTrigger>
          <TabsTrigger value='collection-points' className='w-full'>
            Các điểm tập kết
          </TabsTrigger>
          <TabsTrigger value='transaction-points' className='w-full'>
            Các điểm giao dịch
          </TabsTrigger>
        </TabsList>
        <TabsContent value='country'>
          <CountryTab />
        </TabsContent>
        <TabsContent value='collection-points'>
          <CollectionPointTab collectionPoints={branches.collectionPoints} />
        </TabsContent>
        <TabsContent value='transaction-points'>
          <TransactionPointTab branches={branches} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
