'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import getAbbreviation from '@/lib/getAbbreviation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiSolidChevronDown } from 'react-icons/bi';

const mockProfileMenu = {
  title: 'Lê Viết Đạt',
  role: 'Admin',
  list: [
    {
      name: 'Trang cá nhân',
      href: '/profile',
    },
    {
      name: 'Đăng xuất',
      href: '/logout',
    },
  ],
};

export default function ProfileMenu() {
  const pathname = usePathname();

  return (
    <div className='flex flex-row items-center gap-2'>
      <Avatar>
        <AvatarImage src='https://github.com/shadcn.png' />
        <AvatarFallback>{getAbbreviation(mockProfileMenu.title)}</AvatarFallback>
      </Avatar>

      <NavMenu {...mockProfileMenu} />
    </div>
  );
}

function NavMenu({
  title,
  role,
  list,
}: {
  title: string;
  role: string;
  list?: {
    name: string;
    href?: string;
  }[];
}) {
  return (
    <div className='group/nav relative flex flex-col gap-4 '>
      <div className='flex flex-col'>
        <div className={'flex w-32 flex-row items-center justify-start gap-1 font-semibold'}>
          <span>{title}</span>
          {list && (
            <div className='transition-all group-hover/nav:-rotate-90'>
              <BiSolidChevronDown fontSize={'1.2rem'} />
            </div>
          )}
        </div>
        <span className='text-sm text-gray-700'>{role}</span>
      </div>

      <div className='absolute right-2 hidden pt-[calc(3rem+14px)] group-hover/nav:block'>
        <div className='relative whitespace-nowrap border-t border-t-gray-400 bg-white text-left shadow-lg'>
          {list?.map((item, index) => (
            <Link href={item.href || '#'} key={index}>
              <div className='cursor-pointer px-4 py-2 hover:bg-gray-100'>{item.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
