import Logo from '@/components/main/Logo';
import { Facebook } from 'lucide-react';
import React from 'react';
import { BiLogoGmail } from 'react-icons/bi';

export default function Footer() {
  return (
    <div className='bg-white-300 pt-18 pb-24'>
      <div className='mx-auto grid w-full max-w-screen-xl grid-flow-row grid-cols-3 grid-rows-6 gap-4 px-6 sm:grid-flow-col sm:grid-cols-12 sm:grid-rows-1 sm:px-8 lg:px-16'>
        <div className='col-start-1 col-end-4 row-span-2 flex flex-col items-start sm:col-span-4 sm:col-end-5 '>
          <Logo />
          <p className='mb-4 text-base font-light'>
            <strong className='font-medium'>MagicPost</strong> là đơn vị hàng đầu trong lĩnh vực
            chuyển phát, với mạng lưới phủ rộng khắp cả nước. Chúng tôi tự hào cung cấp dịch vụ
            chuyển phát nhanh, đáng tin cậy và hiệu quả, mang đến trải nghiệm tuyệt vời cho khách
            hàng của mình.
          </p>
          <p className='text-gray-500'>
            © 2023 - {new Date().getFullYear()} <strong>MagicPost</strong>
          </p>
          <p className='mt-2 text-xs text-gray-400'>
            Image by{' '}
            <a href='https://www.freepik.com/free-vector/delivery-service-with-masks-concept_7509757.htm#query=delivery%20man&position=2&from_view=search&track=ais&uuid=2e579fa0-36be-4cd6-9fe8-ff637b091abb'>
              Freepik
            </a>
          </p>
        </div>
        <div className='row-span-2 flex flex-col sm:col-span-2 sm:col-start-7 sm:col-end-9'>
          <p className='text-black-600 mb-4 text-lg font-medium'>Dịch vụ</p>
          <ul className='text-black-500'>
            <li className='my-2 cursor-pointer transition-all hover:text-orange-500'>
              Gửi đơn hàng{' '}
            </li>
            <li className='my-2 cursor-pointer transition-all hover:text-orange-500'>
              Tra cứu đơn hàng{' '}
            </li>
            <li className='my-2 cursor-pointer transition-all hover:text-orange-500'>
              Các chi nhánh{' '}
            </li>
            <li className='my-2 cursor-pointer transition-all hover:text-orange-500'>
              Trở thành đối tác
            </li>
            <li className='my-2 cursor-pointer transition-all hover:text-orange-500'>
              Tuyển dụng{' '}
            </li>
          </ul>
        </div>
        <div className='row-span-2 flex flex-col sm:col-span-2 sm:col-start-9 sm:col-end-11'>
          <p className='text-black-600 mb-4 text-lg font-medium'>Liên kết</p>
          <ul className='text-black-500'>
            <li className='my-2 cursor-pointer transition-all hover:text-orange-500'>FAQ </li>
            <li className='my-2 cursor-pointer transition-all hover:text-orange-500'>
              Hướng dẫn sử dụng{' '}
            </li>
            <li className='my-2 cursor-pointer transition-all hover:text-orange-500'>
              Về chúng tôi{' '}
            </li>
            <li className='my-2 cursor-pointer transition-all hover:text-orange-500'>
              Chính sách bảo mật
            </li>
            <li className='my-2 cursor-pointer transition-all hover:text-orange-500'>
              Điều khoản dịch vụ
            </li>
          </ul>
        </div>
        <div className='row-span-2 flex flex-col sm:col-span-2 sm:col-start-11 sm:col-end-11'>
          <p className='text-black-600 mb-4 text-lg font-medium'>Liên hệ</p>

          <div className='bg-white-500 mx-2 flex items-center justify-center rounded-full p-2 shadow-md'>
            <Facebook className='h-6 w-6' />
          </div>
          <div className='bg-white-500 mx-2 flex items-center justify-center rounded-full p-2 shadow-md'>
            <BiLogoGmail className='h-6 w-6' />
          </div>
        </div>
      </div>
    </div>
  );
}
