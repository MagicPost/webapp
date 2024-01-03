import Logo from '@/components/main/Logo';
import { Facebook } from 'lucide-react';
import React from 'react';
import { BiLogoGmail } from 'react-icons/bi';

export default function Footer() {
  return (
    <div className='bg-white-300 pt-18 pb-24'>
      <div className='mx-auto flex w-full max-w-screen-xl flex-col-reverse gap-4 px-6 sm:flex-row sm:justify-between sm:px-8 lg:px-16'>
        <div className='flex flex-col items-start sm:w-1/2'>
          <Logo />
          <p className='mb-4 mt-2 text-base font-light'>
            <strong className='font-medium'>MagicPost</strong> là đơn vị hàng đầu trong lĩnh vực
            chuyển phát, với mạng lưới phủ rộng khắp cả nước. Chúng tôi tự hào cung cấp dịch vụ
            chuyển phát nhanh, đáng tin cậy và hiệu quả, mang đến trải nghiệm tuyệt vời cho khách
            hàng của mình.
          </p>

          <div className='mb-4 flex flex-row'>
            <div className='bg-white-500 mx-2 flex items-center justify-center rounded-full p-2 shadow-md'>
              <Facebook className='h-6 w-6' />
            </div>
            <div className='bg-white-500 mx-2 flex items-center justify-center rounded-full p-2 shadow-md'>
              <BiLogoGmail className='h-6 w-6' />
            </div>
          </div>

          <p className='mx-auto text-center text-gray-500'>
            © 2023 - {new Date().getFullYear()} <strong>MagicPost</strong>
          </p>
        </div>
        <div className='flex flex-col gap-3 sm:flex-row sm:gap-8'>
          <div className='flex flex-col'>
            <p className='text-black-600 mb-4 text-lg font-medium'>Dịch vụ</p>
            <ul className='text-black-500 grid grid-cols-1 items-center min-[330px]:grid-cols-2 sm:grid-cols-1'>
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
          <div className='flex flex-col'>
            <p className='text-black-600 mb-4 text-lg font-medium'>Liên kết</p>
            <ul className='text-black-500 grid grid-cols-1 items-center min-[330px]:grid-cols-2 sm:grid-cols-1'>
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
        </div>
      </div>
    </div>
  );
}
