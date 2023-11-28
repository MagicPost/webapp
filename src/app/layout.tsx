import type { Metadata } from 'next';
import './globals.css';
import { Noto_Sans } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Magic Post',
  description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='vi' className='scroll-smooth'>
      <body className={notoSans.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
