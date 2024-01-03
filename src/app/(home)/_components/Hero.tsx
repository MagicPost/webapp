'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import getScrollAnimation from '../utils/getScrollAnimation';
import ScrollAnimationWrapper from '../ScrollAnimationWrapper';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MapPin, TruckIcon, Users2 } from 'lucide-react';

const infoList = [
  {
    name: 'Đơn hàng đã được gửi',
    number: '1.230.330+',
    icon: <TruckIcon />,
  },
  {
    name: 'Khách hàng',
    number: '500.000+',
    icon: <Users2 />,
  },
  {
    name: 'Tỉnh thành',
    number: '63/63',
    icon: <MapPin />,
  },
];

export default function Hero() {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div className='mx-auto mt-24 max-w-screen-xl px-8 xl:px-16' id='about'>
      <ScrollAnimationWrapper>
        <motion.div
          className='grid grid-flow-row grid-rows-2 gap-8 py-6 sm:grid-flow-col sm:grid-cols-2 sm:py-16 md:grid-rows-1'
          variants={scrollAnimation}
        >
          <div className=' row-start-2 flex flex-col items-start justify-center sm:row-start-1'>
            <h1 className='text-black-600 text-3xl font-medium leading-normal lg:text-4xl xl:text-5xl'>
              Chuyển phát siêu tốc với <strong>MagicPost</strong>.
            </h1>
            <p className='text-black-500 mb-6 mt-4'>
              Chúng tôi mang đến cho bạn trải nghiệm chuyển phát siêu tốc, đáng tin cậy và hiệu quả
              nhất.
            </p>
            <Button className='px-12 py-4 text-lg font-semibold'>Liên hệ ngay</Button>
          </div>
          <div className='flex w-full'>
            <motion.div className='h-full w-full' variants={scrollAnimation}>
              <Image
                src='/landing/delivery_man.svg'
                alt='magicpost-banner'
                quality={100}
                width={612}
                height={383}
                layout='responsive'
              />
            </motion.div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
      <div className='relative flex w-full'>
        <ScrollAnimationWrapper className='bg-white-500 z-10 grid w-full grid-flow-row grid-cols-1 divide-y-2 divide-gray-100 rounded-lg py-9 sm:grid-flow-row sm:grid-cols-3 sm:divide-x-2 sm:divide-y-0'>
          {infoList.map((listUsers, index) => (
            <motion.div
              className='mx-auto flex w-8/12 items-center justify-start px-4 py-4 sm:mx-0 sm:w-auto sm:justify-center sm:py-6'
              key={index}
              custom={{ duration: 2 + index }}
              variants={scrollAnimation}
            >
              <div className='mx-auto flex w-40 sm:w-auto'>
                <div className='mr-6 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100'>
                  <span>{listUsers.icon}</span>
                </div>
                <div className='flex flex-col'>
                  <p className='text-black-600 text-xl font-bold'>{listUsers.number}</p>
                  <p className='text-black-500 text-lg'>{listUsers.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </ScrollAnimationWrapper>
        <div
          className='bg-black-600 roudned-lg absolute left-0 right-0 top-0 mx-auto mt-8 h-64 w-11/12 opacity-5 sm:h-48'
          style={{ filter: 'blur(114px)' }}
        ></div>
      </div>
    </div>
  );
}