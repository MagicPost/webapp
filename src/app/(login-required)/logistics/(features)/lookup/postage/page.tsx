import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TransitServiceTypes } from '@/constants';
import { WeightTypes, WeightPostages } from '@/constants/postage';

export default function PostagePage() {
  return (
    <div className='mt-12 w-full p-4 pb-12 lg:mt-0'>
      <h1 className='mb-4 text-2xl font-bold'>Tra cứu cước phí</h1>
      <div className='mx-auto mt-2 w-full space-y-6 text-center'>
        <h2 className='text-lg font-semibold uppercase'>Bảng giá chuyển phát</h2>
        <Tabs defaultValue='standard' className='mx-auto'>
          <TabsList>
            <TabsTrigger value='economical'>Chuyển phát tiết kiệm</TabsTrigger>
            <TabsTrigger value='standard'>Chuyển phát thường</TabsTrigger>
            <TabsTrigger value='express'>Chuyển phát hỏa tốc</TabsTrigger>
          </TabsList>
          <TabsContent value='economical'>
            <WeightTableTemplate type={TransitServiceTypes.ECONOMICAL} />
          </TabsContent>
          <TabsContent value='standard'>
            <WeightTableTemplate type={TransitServiceTypes.STANDARD} />
          </TabsContent>
          <TabsContent value='express'>
            <WeightTableTemplate type={TransitServiceTypes.EXPRESS} />
          </TabsContent>
        </Tabs>
      </div>

      <div className='mx-auto mt-14 w-full space-y-6 text-center'>
        <h2 className='text-lg font-semibold uppercase'>Bảng giá dịch vụ cộng thêm</h2>
        <PlusServiceTable />
      </div>
    </div>
  );
}

function WeightTableTemplate({ type }: { type: TransitServiceTypes }) {
  const postages = WeightPostages[type];

  return (
    <div className='mx-auto max-w-[900px] space-y-6 text-center'>
      <Table>
        <TableHeader className='bg-white text-center'>
          <TableRow className='hover:opacity-100'>
            <TableHead rowSpan={2} className='border text-center'>
              Trọng lượng
            </TableHead>
            <TableHead rowSpan={2} className='border text-center'>
              Nội tỉnh
            </TableHead>
            <TableHead colSpan={3} className='mx-auto border text-center'>
              Liên tỉnh
            </TableHead>
            <TableHead rowSpan={2} className='border text-center'>
              Đơn vị
            </TableHead>
          </TableRow>
          <TableRow className='hover:opacity-100'>
            <TableHead className='border text-center'>Đến 100km</TableHead>
            <TableHead className='border text-center'>Đến 400km</TableHead>
            <TableHead className='border text-center'>Trên 400km</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='text-center'>
          {postages[WeightTypes.NOT_OVER_2KG].map((postage, index) => (
            <TableRow key={postage.weight}>
              <TableCell className='border'>{postage.weight}</TableCell>
              <TableCell className='border'>{postage.local.toLocaleString('vi-VN')}</TableCell>
              <TableCell className='border'>{postage.to100km.toLocaleString('vi-VN')}</TableCell>
              <TableCell className='border'>{postage.to400km.toLocaleString('vi-VN')}</TableCell>
              <TableCell className='border'>{postage.over400km.toLocaleString('vi-VN')}</TableCell>
              {index === 0 && (
                <TableCell
                  rowSpan={postages[WeightTypes.NOT_OVER_2KG].length}
                  className='border hover:bg-white'
                >
                  đồng/bưu gửi
                </TableCell>
              )}
            </TableRow>
          ))}

          <TableRow className='border'>
            <TableCell colSpan={5}>Mỗi kg tiếp theo</TableCell>
          </TableRow>

          {postages[WeightTypes.OVER_2KG].map((postage, index) => (
            <TableRow key={postage.weight}>
              <TableCell className='border'>{postage.weight}</TableCell>
              <TableCell className='border'>+{postage.local.toLocaleString('vi-VN')}</TableCell>
              <TableCell className='border'>+{postage.to100km.toLocaleString('vi-VN')}</TableCell>
              <TableCell className='border'>+{postage.to400km.toLocaleString('vi-VN')}</TableCell>
              <TableCell className='border'>+{postage.over400km.toLocaleString('vi-VN')}</TableCell>
              {index === 0 && (
                <TableCell
                  rowSpan={postages[WeightTypes.OVER_2KG].length}
                  className='border hover:bg-white'
                >
                  đồng/kg
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function PlusServiceTable() {
  return (
    <div className='mx-auto max-w-[900px] space-y-6 text-center'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='border text-center'>Loại dịch vụ</TableHead>
            <TableHead colSpan={3} className='border text-center'>
              Cước phí
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className='border'>Bảo hiểm hàng hóa</TableCell>
            <TableCell className='border'>0.5% giá trị đơn hàng; tối thiểu 5.000đ/đơn.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='border'>Dịch vụ hoàn cước</TableCell>
            <TableCell className='border'>5.000đ/đơn</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
