'use client';
import Logo from '@/components/main/Logo';
import { useQRCode } from 'next-qrcode';

export default function ReceiptPage() {
  // 1748 x 2480
  return (
    <div className='flex h-screen w-screen items-center justify-center overflow-auto font-serif'>
      <div className='h-[660px] w-[900px] border border-gray-400 px-8'>
        <Header />
        <Body />
        <Footer />
      </div>
    </div>
  );
}

function Header() {
  const { Canvas } = useQRCode();

  return (
    <div className='flex w-full flex-row items-center justify-between gap-0'>
      <div className='flex w-1/3 flex-1 flex-col items-center justify-center'>
        <Logo className='font-mono' />
        <span className='pl-6 font-semibold'>Điểm giao dịch: Cầu Giấy</span>
      </div>

      <h2 className='w-1/3 flex-1 text-center text-2xl font-semibold uppercase'>
        Biên nhận <br /> chuyển phát
      </h2>

      <div className='flex w-1/3 flex-col items-center justify-center pt-4'>
        <div className='flex-1'>
          <Canvas
            text={'https://github.com/bunlong/next-qrcode'}
            options={{
              errorCorrectionLevel: 'M',
              margin: 3,
              scale: 2,
              width: 100,
            }}
          />
          <span className='pl-1 text-sm'>MP2323421213</span>
        </div>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className='flex h-[480px] w-full flex-1 flex-row border border-black'>
      <div className='flex h-full w-full flex-1 flex-col items-start justify-start border-r border-r-black'>
        <div className='h-[120px] w-full border-b border-b-black p-2'>
          <Client role='sender' />
        </div>

        <div className='flex w-full flex-row justify-between border-b border-b-black p-2'>
          <span className='flex-1 text-base font-semibold'>2. Loại hàng gửi:</span>
          <div className='flex flex-row justify-start gap-8 px-8'>
            <div className='flex flex-row items-center justify-center gap-2'>
              <input type='checkbox' checked />
              <span>Hàng hóa</span>
            </div>

            <div className='flex flex-row items-center justify-center gap-2'>
              <input type='checkbox' />
              <span>Tài liệu</span>
            </div>
          </div>
        </div>

        <div className='w-full flex-1 border-b border-b-black p-2'>
          <PackageInfo />
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
          <Client role='receiver' />
        </div>
        <div className='flex h-[230px] w-full flex-row border-b border-b-black'>
          <div className='w-1/2 flex-1 border-r border-r-black'>
            <div className='h-1/2 p-2'>
              <span className='text-base font-semibold'>5. Dịch vụ cộng thêm:</span>
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
                    <td className='w-1/2 text-right'>50.000 đ</td>
                  </tr>
                  <tr className='text-sm'>
                    <td className='w-1/2'>Phụ phí</td>
                    <td className='w-1/2 text-right'>0 đ</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className='text-sm font-semibold'>
                    <td className='w-1/2'>Tổng (+VAT)</td>
                    <td className='w-1/2 text-right'>50.000 đ</td>
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
                    <td className='w-1/2 text-right'>50.000 đ</td>
                  </tr>
                  <tr className='text-sm'>
                    <td className='w-1/2'>Thu khác</td>
                    <td className='w-1/2 text-right'>50.000 đ</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className='text-sm font-semibold'>
                    <td className='w-1/2'>Tổng</td>
                    <td className='w-1/2 text-right'>50.000 đ</td>
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
              <span className='text-center font-semibold'>12/12/2021 - 04:32:22</span>
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

function Footer() {
  return (
    <div className='mt-1 text-center text-xs font-semibold'>
      Hotline: 1900 4546 - Website: www.magicpost.ninja - Email: uet.magicpost@gmail.com
    </div>
  );
}

function Client({ role = 'sender' }: { role?: 'sender' | 'receiver' }) {
  return (
    <div className='flex w-full flex-col items-start'>
      <span className='text-base font-semibold'>
        1. Thông tin người {role === 'sender' ? 'gửi' : 'nhận'}:
      </span>
      <div className='flex w-full flex-row justify-between'>
        <span className='text-sm'>Họ tên: Nguyễn Văn A</span>
        <span className='text-sm'>SĐT: 0123456789</span>
      </div>
      <span className='text-sm'>Địa chỉ: 123, Nguyễn Trãi, Thanh Xuân, Hà Nội</span>
      <br />
      <span className='text-sm'>Mã bưu chính: 100000</span>
    </div>
  );
}

function PackageInfo() {
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
          <tr className='text-sm'>
            <td className='w-2/5'>Áo thun</td>
            <td className='w-1/5'>1</td>
            <td className='w-1/5'>0.5 kg</td>
            <td className='w-1/5'>100.000 đ</td>
          </tr>
          <tr className='text-sm'>
            <td className='w-2/5'>Quần jean</td>
            <td className='w-1/5'>1</td>
            <td className='w-1/5'>0.5 kg</td>
            <td className='w-1/5'>100.000 đ</td>
          </tr>
        </tbody>
        <tfoot className=' border-collapse border border-black'>
          <tr className='text-sm font-semibold'>
            <td className='w-2/5'>Tổng</td>
            <td className='w-1/5'>2</td>
            <td className='w-1/5'>1 kg</td>
            <td className='w-1/5'>200.000 đ</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
