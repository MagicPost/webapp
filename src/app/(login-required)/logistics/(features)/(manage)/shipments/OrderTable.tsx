'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function OrderTable() {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Mã đơn hàng</TableHead>
            <TableHead>Mã chuyến xe</TableHead>
            <TableHead>Người gửi</TableHead>
            <TableHead className='text-right'>Người nhận</TableHead>
            <TableHead>Số lượng hàng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Thu hộ</TableHead>
            <TableHead>Tổng cước</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className='font-medium'>MP1707613840</TableCell>
            <TableCell>MP1707613840</TableCell>
            <TableCell>Le Viet Dat</TableCell>
            <TableCell className='text-right'>Dat LV</TableCell>
            <TableCell>23</TableCell>
            <TableCell>Đã giao</TableCell>
            <TableCell>20/07/2021</TableCell>
            <TableCell>0</TableCell>
            <TableCell>0</TableCell>
            <TableCell>
              <button className='btn btn-primary'>Xem chi tiết</button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
