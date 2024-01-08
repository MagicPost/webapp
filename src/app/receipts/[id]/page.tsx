'use client';
import { getPackageById } from '@/actions/package/getPackageById';
import Empty from '@/components/main/Empty';
import Loading from '@/components/main/Loading';
import Logo from '@/components/main/Logo';
import { PackageTypes, Payer } from '@/constants';
import { GetPackageDetailsDTO } from '@/dtos/package/package.dto';
import { numberToVnd } from '@/lib/currency';
import { getTimeString, getViLocaleDateString } from '@/lib/time';
import { useQRCode } from 'next-qrcode';
import { useEffect, useState } from 'react';
import { Client } from '@/db/models/Package';

export default function ReceiptPage({ params: { id } }: { params: { id: string } }) {
  const [packageData, setPackageData] = useState<GetPackageDetailsDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    load();
    return () => {
      active = false;
    };
    async function load() {
      setIsLoading(true);
      if (!active) return;
      const res = await getPackageById({
        _id: id,
        include: {
          sentAt: true,
          receivedAt: true,
          creator: false,
          tracking: false,
        },
      });
      if (!res.ok) setError(true);
      setPackageData(res.data);
      console.log(res.data);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <Loading text={'Đang tải...'} className='mt-12' />;
  }

  if (error) {
    return <Empty message={'Có lỗi xảy ra!'} className='mt-12' />;
  }

  if (!packageData) {
    return <Empty message={'Không tìm thấy đơn hàng!'} className='mt-12' />;
  }

  return (
    <>
      <style jsx>
        {`
          @page {
            size: A4 landscape;
            margin: 0;
          }
        `}
      </style>
      <div className='flex h-screen w-screen items-center justify-center overflow-auto font-serif'>
        <div className='h-[660px] w-[960px] border border-gray-400 px-8 print:h-full print:w-full'>
          <Header packageData={packageData} />
          <Body packageData={packageData} />
          <Footer />
        </div>
      </div>
    </>
  );
}

function Header({ packageData }: { packageData: GetPackageDetailsDTO }) {
  const { Canvas } = useQRCode();

  return (
    <div className='flex w-full flex-row items-center justify-between gap-0'>
      <div className='flex w-1/3 flex-1 flex-col items-center justify-center'>
        <Logo className='font-mono' />
        <span className='pl-6 font-semibold'>{packageData.sentAt.name}</span>
      </div>

      <h2 className='w-1/3 flex-1 text-center text-2xl font-semibold uppercase'>
        Biên nhận <br /> chuyển phát
      </h2>

      <div className='flex w-1/3 flex-col items-center justify-center pt-4'>
        <div className='flex flex-1 flex-col items-center justify-center self-center'>
          <Canvas
            text={`${process.env.NEXT_PUBLIC_SERVER_URL}/?package=${packageData._id}`}
            options={{
              errorCorrectionLevel: 'M',
              margin: 3,
              scale: 2,
              width: 100,
            }}
          />
          <span className='mx-auto pl-1 text-center text-sm'>{packageData._id}</span>
        </div>
      </div>
    </div>
  );
}

function Body({ packageData }: { packageData: GetPackageDetailsDTO }) {
  const totalPostages = packageData.postages.main + packageData.postages.plus;

  const receiverPostages = packageData.postages.payer === Payer.SENDER ? 0 : totalPostages;

  return (
    <div className='flex h-[480px] w-full flex-1 flex-row border border-black'>
      <div className='flex h-full w-full flex-1 flex-col items-start justify-start border-r border-r-black'>
        <div className='h-[120px] w-full border-b border-b-black p-2'>
          <ClientInfo role='sender' client={packageData.sender} />
        </div>

        <div className='flex w-full flex-row justify-between border-b border-b-black p-2'>
          <span className='flex-1 text-base font-semibold'>2. Loại hàng gửi:</span>
          <div className='flex flex-row justify-start gap-8 px-8'>
            <div className='flex flex-row items-center justify-center gap-2'>
              <input type='checkbox' readOnly checked={packageData.type === PackageTypes.PARCEL} />
              <span>Hàng hóa</span>
            </div>

            <div className='flex flex-row items-center justify-center gap-2'>
              <input
                type='checkbox'
                readOnly
                checked={packageData.type === PackageTypes.DOCUMENT}
              />
              <span>Tài liệu</span>
            </div>
          </div>
        </div>

        <div className='w-full flex-1 border-b border-b-black p-2'>
          <PackageInfo items={packageData.items} />
        </div>

        <div className='h-[100px] p-2'>
          <div className='flex flex-row items-center justify-between'>
            <span className='text-base font-semibold'>4. Cam kết của người gửi:</span>
          </div>

          <div className='flex flex-row justify-between gap-4'>
            <p className='w-2/3 flex-1 text-xs'>
              Hàng hóa không thuộc loại cấm vận, không thuộc loại hàng hóa bị hạn chế vận chuyển,
              không thuộc loại hàng hóa bị cấm vận theo quy định của pháp luật Việt Nam và quốc tế.
            </p>
          </div>
        </div>
      </div>

      <div className='flex h-full w-full flex-1 flex-col items-start'>
        <div className='h-[120px] w-full border-b border-b-black p-2'>
          <ClientInfo role='receiver' client={packageData.receiver} />
        </div>
        <div className='flex h-[230px] w-full flex-row border-b border-b-black'>
          <div className='w-1/2 flex-1 border-r border-r-black'>
            <div className='h-1/2 p-2'>
              <span className='text-base font-semibold'>5. Dịch vụ cộng thêm:</span>

              <div className='ml-2 flex flex-row flex-wrap justify-between gap-1'>
                <div className='flex flex-row items-center justify-center gap-2'>
                  <input type='checkbox' readOnly checked={true} />
                  <span>Bảo hiểm hàng hóa</span>
                </div>

                <div className='flex flex-row items-center justify-center gap-2'>
                  <input type='checkbox' readOnly checked={true} />
                  <span>Dịch vụ hoàn cước</span>
                </div>
              </div>
            </div>
            <div className='w-full border-t border-t-black p-2'>
              <span className='text-base font-semibold'>6. Ghi chú nghiệp vụ:</span>
            </div>
          </div>
          <div className='flex h-full w-1/2 flex-col'>
            <div className='p-2'>
              <span className='text-base font-bold'>7. Cước phí:</span>
              <table className='w-full text-left'>
                <tbody>
                  <tr className='text-sm'>
                    <td className='w-1/2'>Cước chính</td>
                    <td className='w-1/2 text-right'>{numberToVnd(totalPostages)}</td>
                  </tr>
                  <tr className='text-sm'>
                    <td className='w-1/2'>Phụ phí</td>
                    <td className='w-1/2 text-right'>0 đ</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className='text-sm font-semibold'>
                    <td className='w-1/2'>Tổng (+VAT)</td>
                    <td className='w-1/2 text-right'>{numberToVnd(totalPostages)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className='p-2'>
              <span className='text-base font-bold'>8. Thu của người nhận:</span>
              <table className='w-full text-left'>
                <tbody>
                  <tr className='text-sm'>
                    <td className='w-1/2'>COD</td>
                    <td className='w-1/2 text-right'>
                      {numberToVnd(packageData.services.COD || 0)}
                    </td>
                  </tr>
                  <tr className='text-sm'>
                    <td className='w-1/2'>Thu khác</td>
                    <td className='w-1/2 text-right'>{numberToVnd(receiverPostages)}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className='text-sm font-semibold'>
                    <td className='w-1/2'>Tổng</td>
                    <td className='w-1/2 text-right'>
                      {numberToVnd(packageData.services.COD || 0 + receiverPostages)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <div className='flex w-full flex-1'>
          <div className='w-1/2 border-r border-r-black p-2'>
            <div className='text-sm italic'>
              <p>Ngày giờ gửi: </p>
              <span className='text-center font-semibold'>
                {getViLocaleDateString(packageData.createdAt)} -{' '}
                {getTimeString(packageData.createdAt)}
              </span>
            </div>

            <div className='mt-1 flex flex-col items-center justify-center'>
              <p className='text-sm font-semibold'>Người gửi ký tên</p>
              <span className='text-xs'>(Ghi rõ họ tên)</span>
            </div>
          </div>

          <div className='w-1/2 p-2'>
            <div className='text-sm italic'>
              <p>Ngày giờ nhận: </p>
              <span className='text-center font-semibold'>...../...../202... - ...:...</span>
            </div>

            <div className='mt-1 flex flex-col items-center justify-center'>
              <p className='text-sm font-semibold'>Người nhận ký tên</p>
              <span className='text-xs'>(Ghi rõ họ tên)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientInfo({ role = 'sender', client }: { role?: 'sender' | 'receiver'; client: Client }) {
  return (
    <div className='flex w-full flex-col items-start'>
      <span className='text-base font-semibold'>
        1. Thông tin người {role === 'sender' ? 'gửi' : 'nhận'}:
      </span>
      <div className='flex w-full flex-row justify-between'>
        <span className='text-sm'>Họ tên: {client.fullname}</span>
        <span className='text-sm'>SĐT: {client.phone}</span>
      </div>
      <span className='text-sm'>Địa chỉ: {client.address}</span>
      <br />
      <span className='text-sm'>Mã bưu chính: 100000</span>
    </div>
  );
}

function PackageInfo({
  items,
}: {
  items: {
    name: string;
    quantity: number;
    weight: number;
    value: number;
  }[];
}) {
  const totalWeight = items.reduce((sum, item) => {
    sum += item.weight;
    return sum;
  }, 0);

  const totalValue = items.reduce((sum, item) => {
    sum += item.value;
    return sum;
  }, 0);

  const totalQuantity = items.reduce((sum, item) => {
    sum += item.quantity;
    return sum;
  }, 0);

  return (
    <div className='w-full'>
      <span className='text-base font-semibold'>3. Thông tin hàng hóa:</span>
      <table className='w-full border-collapse border border-black text-center'>
        <thead className=' w- border-collapse border border-black'>
          <tr className='text-sm font-semibold'>
            <th className='w-2/6'>Tên hàng</th>
            <th className='w-1/6'>Số lượng</th>
            <th className='w-1/6'>Trọng lượng</th>
            <th className='w-2/6'>Giá trị</th>
          </tr>
        </thead>
        <tbody className='h-full border-collapse border border-black'>
          {items.map((item, index) => (
            <tr className='text-sm' key={index}>
              <td className='w-2/5'>{item.name}</td>
              <td className='w-1/5'>{item.quantity}</td>
              <td className='w-1/5'>{formatWeight(item.weight)}</td>
              <td className='w-1/5'>{numberToVnd(item.value || 0)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className=' border-collapse border border-black'>
          <tr className='text-sm font-semibold'>
            <td className='w-2/5'>Tổng</td>
            <td className='w-1/5'>{totalQuantity}</td>
            <td className='w-1/5'>{formatWeight(totalWeight)}</td>
            <td className='w-1/5'>{numberToVnd(totalValue || 0)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function formatWeight(weight: number) {
  return weight < 1000 ? `${weight}g` : `${(weight / 1000).toFixed(3)}kg`;
}

function Footer() {
  return (
    <div className='mt-1 text-center text-xs font-semibold'>
      Hotline: 1900 4546 - Website: www.magicpost.ninja - Email: uet.magicpost@gmail.com
    </div>
  );
}
