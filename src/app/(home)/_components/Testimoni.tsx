'use client';

import React, { useMemo, useState } from 'react';

import Slider from 'react-slick';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ScrollAnimationWrapper from '../ScrollAnimationWrapper';
import { motion } from 'framer-motion';
import getScrollAnimation from '../utils/getScrollAnimation';

const listTestimoni = [
  {
    name: 'David Nguyen',
    image: '/avatar/male.svg',
    district: 'Quận Tân Bình',
    city: 'TP. Hồ Chí Minh',
    rating: '4.8',
    comment:
      'Tôi rất hài lòng với dịch vụ vận chuyển. Gói hàng của tôi đã được gửi đi nhanh chóng và đến đích đúng hẹn. Điều này thực sự làm tăng trải nghiệm mua sắm của tôi.',
  },
  {
    name: 'Hồng Ngọc',
    image: '/avatar/female.svg',
    district: 'Hoằng Hóa',
    city: 'Thanh Hóa',
    rating: '5.0',
    comment:
      'Tôi gặp một số vấn đề với đơn hàng của mình và đã liên hệ với bộ phận hỗ trợ khách hàng. Họ rất nhanh chóng và giúp đỡ tôi giải quyết vấn đề một cách hiệu quả. Thực sự rất ấn tượng.',
  },
  {
    name: 'Trần Thị Thanh Mai',
    image: '/avatar/female.svg',
    district: 'Đống Đa',
    city: 'Hà Nội',
    rating: '4.9',
    comment:
      'Phí vận chuyển của MagicPost rất hợp lý và minh bạch. Tôi không gặp phải bất kỳ chi phí ẩn nào và cảm thấy rằng tôi đã nhận được giá trị đúng đắn cho số tiền đã chi trả.',
  },
  {
    name: 'Nguyễn Văn Bảo',
    image: '/avatar/male.svg',
    district: 'Hồng Lĩnh',
    city: 'Hà Tĩnh',
    rating: '4.6',
    comment:
      'Tuy giao hàng hơi chậm nhưng chất lượng dịch vụ rất tốt. Tôi sẽ tiếp tục sử dụng dịch vụ của MagicPost.',
  },
];

export default function Testimoni() {
  const settings = {
    dots: true,
    customPaging: function (i: number) {
      return (
        <a className=''>
          <span className='mx-2 block h-4 w-4 cursor-pointer rounded-l-full rounded-r-full transition-all '></span>
        </a>
      );
    },
    dotsClass: 'slick-dots w-max absolute mt-20  ',
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [sliderRef, setSliderRef] = useState<any>(null);
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className='mx-auto my-6 flex w-full max-w-screen-xl flex-col px-6 py-3 sm:my-16 sm:px-8 sm:py-4 lg:px-16'
      id='testimoni'
    >
      <ScrollAnimationWrapper>
        <motion.h3
          variants={scrollAnimation}
          className='text-black-600 mx-auto w-9/12 text-center text-2xl font-medium leading-normal sm:mx-auto sm:text-3xl lg:w-4/12 lg:text-4xl'
        >
          Tin tưởng từ khách hàng trên cả nước.
        </motion.h3>
        <motion.p
          variants={scrollAnimation}
          className='mx-auto mb-2 mt-4 w-10/12 text-center leading-normal text-gray-800 sm:w-7/12 lg:w-7/12'
        >
          Đánh giá từ khách hàng là động lực <br /> để chúng tôi hoàn thiện và phát triển dịch vụ.
        </motion.p>
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper className='flex w-full flex-col py-12'>
        <motion.div variants={scrollAnimation}>
          <Slider
            {...settings}
            arrows={false}
            ref={setSliderRef}
            className='flex  items-stretch justify-items-stretch'
          >
            {listTestimoni.map((testimoni, index) => (
              <TestimoniItem key={index} testimoni={testimoni} />
            ))}
          </Slider>
          <div className='flex w-full items-center justify-end'>
            <div className='mt-14 flex w-auto flex-none justify-between'>
              <div
                className='hover:text-white-500 mx-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-primary text-primary transition-all hover:bg-orange-500'
                onClick={sliderRef?.slickPrev}
              >
                <ArrowLeft className='h-6 w-6 ' />
              </div>
              <div
                className='hover:text-white-500 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-primary text-primary transition-all hover:bg-orange-500'
                onClick={sliderRef?.slickNext}
              >
                <ArrowRight className='h-6 w-6' />
              </div>
            </div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
    </div>
  );
}

function TestimoniItem({
  testimoni,
}: {
  testimoni: {
    name: string;
    image: string;
    district: string;
    city: string;
    rating: string;
    comment: string;
  };
}) {
  return (
    <div className='flex h-full items-stretch px-3'>
      <div className='flex flex-col rounded-lg border-2 border-secondary p-8 transition-all hover:border-primary-foreground'>
        <div className='flex w-full flex-col items-stretch xl:flex-row xl:items-center'>
          <div className='order-2 flex xl:order-1'>
            <Image src={testimoni.image} height={50} width={50} alt='Icon People' />
            <div className='ml-5 flex flex-col text-left'>
              <p className='text-black-800 text-lg font-semibold capitalize'>{testimoni.name}</p>
              <p className='text-black-500 text-xs capitalize'>
                {testimoni.district}, {testimoni.city}
              </p>
            </div>
          </div>
          <div className='order-1 ml-auto flex flex-none items-center xl:order-2'>
            <p className='text-sm'>{testimoni.rating}</p>
            <span className='ml-2 flex'>
              <FaStar className='h-6 w-6 text-yellow-500' />
            </span>
          </div>
        </div>
        <p className='mt-5 text-left'>“{testimoni.comment}”</p>
      </div>
    </div>
  );
}
