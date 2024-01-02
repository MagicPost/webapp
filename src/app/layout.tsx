import type { Metadata } from 'next';
import './globals.css';
import { Noto_Sans } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as HotToaster } from 'react-hot-toast';
import { cn } from '@/lib/utils';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'MagicPost',
  description: 'Giao hàng hơn bao giờ hết!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='vi' className='scroll-smooth'>
      <body className={cn(notoSans.className, 'overflow-y-hidden')}>
        {children}
        <Toaster />
        <HotToaster />
      </body>
    </html>
  );
}
