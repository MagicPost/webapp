'use client';

import { useState, useEffect } from 'react';
import { Link as LinkScroll } from 'react-scroll';
import Logo from '@/components/main/Logo';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const OrderTrackingDialog = dynamic(() => import('./OrderTracking'), { ssr: false });

const Header = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [scrollActive, setScrollActive] = useState(false);

  const searchParams = useSearchParams();
  const packageId = searchParams.get('package') || null;

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrollActive(window.scrollY > 20);
    });
  }, []);
  return (
    <>
      <header
        className={cn(
          'fixed top-0 z-30 w-full bg-white transition-all',
          scrollActive ? ' pt-0 shadow-md' : ' pt-4'
        )}
      >
        <nav className='mx-auto grid max-w-screen-xl grid-flow-col px-6 py-3 sm:px-8 sm:py-4 lg:px-16'>
          <div className='col-start-1 col-end-2 flex items-center'>
            <Logo />
          </div>
          <ul className='text-black-500 col-start-4 col-end-8 hidden items-center lg:flex'>
            <LinkScroll
              activeClass='active'
              to='about'
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink('about');
              }}
              className={
                'animation-hover relative mx-2 inline-block cursor-pointer px-4 py-2' +
                (activeLink === 'about'
                  ? ' animation-active text-orange-500 '
                  : ' text-black-500 a hover:text-orange-500')
              }
            >
              Giới thiệu
            </LinkScroll>
            <LinkScroll
              activeClass='active'
              to='services'
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink('services');
              }}
              className={
                'animation-hover relative mx-2 inline-block cursor-pointer px-4 py-2' +
                (activeLink === 'services'
                  ? ' animation-active text-orange-500 '
                  : ' text-black-500 hover:text-orange-500 ')
              }
            >
              Dịch vụ
            </LinkScroll>
            <LinkScroll
              activeClass='active'
              to='testimoni'
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink('testimoni');
              }}
              className={
                'animation-hover relative mx-2 inline-block cursor-pointer px-4 py-2' +
                (activeLink === 'testimoni'
                  ? ' animation-active text-orange-500 '
                  : ' text-black-500 hover:text-orange-500 ')
              }
            >
              Đánh giá từ khách hàng
            </LinkScroll>
          </ul>
          <div className='col-start-10 col-end-12 flex items-center justify-end font-medium'>
            <span className='text-black-600 mx-2 capitalize tracking-wide transition-all hover:text-orange-500 sm:mx-4'>
              <OrderTrackingDialog packageId={packageId} />
            </span>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}
      <nav className='shadow-t fixed bottom-0 left-0 right-0 z-20 px-4 sm:px-8 lg:hidden '>
        <div className='bg-white sm:px-3'>
          <ul className='flex w-full items-center justify-between text-black'>
            <LinkScroll
              activeClass='active'
              to='about'
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink('about');
              }}
              className={
                'mx-1 flex flex-col items-center border-t-2 px-3 py-2 text-xs transition-all sm:mx-2 sm:px-4 ' +
                (activeLink === 'about'
                  ? '  border-orange-500 text-orange-500'
                  : ' border-transparent')
              }
            >
              <svg
                className='h-6 w-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <span className='hidden min-[280px]:block'>Giới thiệu</span>
            </LinkScroll>
            <LinkScroll
              activeClass='active'
              to='services'
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink('services');
              }}
              className={
                'mx-1 flex flex-col items-center border-t-2 px-3 py-2 text-xs transition-all sm:mx-2 sm:px-4 ' +
                (activeLink === 'services'
                  ? '  border-orange-500 text-orange-500'
                  : ' border-transparent ')
              }
            >
              <svg
                className='h-6 w-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
                />
              </svg>
              <span className='hidden min-[280px]:block'>Dịch vụ</span>
            </LinkScroll>

            <LinkScroll
              activeClass='active'
              to='testimoni'
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink('testimoni');
              }}
              className={
                'mx-1 flex flex-col items-center border-t-2 px-3 py-2 text-xs transition-all sm:mx-2 sm:px-4 ' +
                (activeLink === 'testimoni'
                  ? '  border-orange-500 text-orange-500'
                  : ' border-transparent ')
              }
            >
              <svg
                className='h-6 w-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                />
              </svg>
              <span className='hidden min-[280px]:block'>Đánh giá</span>
            </LinkScroll>
          </ul>
        </div>
      </nav>
      {/* End Mobile Navigation */}
    </>
  );
};

export default Header;
