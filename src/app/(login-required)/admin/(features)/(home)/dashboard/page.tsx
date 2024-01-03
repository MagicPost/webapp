import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CountryTab from './tabs/country';
import CollectionPointTab from './tabs/collection-point';
import TransactionPointTab from './tabs/transaction-point';

export default function DashboardPage() {
  return (
    <div className='p-4'>
      <h1 className='mb-4 text-2xl font-bold'>Thống kê</h1>

      <Tabs defaultValue='country' className='w-full'>
        <TabsList>
          <TabsTrigger value='country'>Toàn quốc</TabsTrigger>
          <TabsTrigger value='collection-points'>Các điểm tập kết</TabsTrigger>
          <TabsTrigger value='transaction-points'>Các điểm giao dịch</TabsTrigger>
        </TabsList>
        <TabsContent value='country'>
          <CountryTab />
        </TabsContent>
        <TabsContent value='collection-points'>
          <CollectionPointTab />
        </TabsContent>
        <TabsContent value='transaction-points'>
          <TransactionPointTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
