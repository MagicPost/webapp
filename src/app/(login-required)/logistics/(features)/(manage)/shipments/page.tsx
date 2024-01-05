import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomTabs from './CustomTabs';
import { tabs as _tabs } from './tabs';
import { getBranchOf } from '@/actions/branch/getBranchOf';
import { auth } from '@/lib/auth';
import { GetBasicBranchDTO } from '@/dtos/branches/branch.dto';

export default async function ShipmentManagement() {
  const session = await auth();
  const res = await getBranchOf({
    user: { email: session?.user?.email },
  });
  const branch: Omit<GetBasicBranchDTO, 'address' | 'manager'> = res.data;
  const tabs = _tabs[branch.type];

  return (
    <div className='mt-12 w-full p-4 lg:mt-0'>
      <h1 className='mb-8 text-2xl font-bold'>Quản lý vận đơn</h1>

      <Tabs defaultValue={tabs[0].value} className='w-full'>
        <TabsList className='flex h-full w-full flex-row items-center justify-between space-x-2 overflow-x-auto px-4 py-3'>
          {tabs.map((tab, index) => (
            <TabsTrigger value={tab.value} key={index}>
              <CustomTabs {...tab} total={100} />
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab, index) => (
          <TabsContent value={tab.value} key={index}>
            {tab.produceComponent && tab.produceComponent({ branch })}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
