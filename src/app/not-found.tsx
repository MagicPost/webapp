import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: '404 Not Found | Magic Post',
};

export default function NotFoundPage(): React.ReactNode {
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center gap-1'>
      <p>Magic Post | 404 Not found</p>
      <Link href={'/'} className='underline underline-offset-4'>
        Quay về trang chủ
      </Link>
    </div>
  );
}
