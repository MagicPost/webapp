'use client';

import { GetUserDTO } from '@/dtos/user/user.dto';
import { columns } from './_components/EmployeeColumns';
import EmployeeTable from './_components/EmployeeTable';
import { DisplayCollectionPointDTO } from '@/dtos/branches/collection-point.dto';
import { DisplayTransactionPointDTO } from '@/dtos/branches/transaction-point.dto';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NewManagerDialog from './_components/NewManagerDialog';
import { useState } from 'react';

export default function InnerPage({
  _managers,
  staffs,
  branches,
}: {
  _managers?: GetUserDTO[];
  staffs?: GetUserDTO[];
  branches?: {
    collectionPoints: DisplayCollectionPointDTO[];
    transactionPoints: DisplayTransactionPointDTO[];
  };
}) {
  const [managers, setManagers] = useState(_managers || []);

  return (
    <Tabs defaultValue='manager' className='w-full max-[390px]:my-8 max-[390px]:h-full'>
      <TabsList className='flex flex-col min-[390px]:flex-row'>
        <TabsTrigger value='manager' className='max-[390px]:w-full'>
          Tài khoản trưởng điểm
        </TabsTrigger>
        <TabsTrigger value='staff' className='max-[390px]:w-full'>
          Tài khoản giao dịch viên
        </TabsTrigger>
      </TabsList>
      <TabsContent value='manager'>
        <EmployeeTable
          tableProps={{ columns, data: managers! }}
          addManagerComponent={<NewManagerDialog branches={branches!} setManagers={setManagers} />}
        />
      </TabsContent>
      <TabsContent value='staff'>
        <EmployeeTable tableProps={{ columns, data: staffs! }} />
      </TabsContent>
    </Tabs>
  );
}
