import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { BiSolidChevronDown } from 'react-icons/bi';
import { auth } from '@/lib/auth';
import { getAbbreviation, getShortName, roleToText } from '@/lib/text';
import { Roles } from '@/constants';
import { getUserByEmail } from '@/actions/user';

const dropdownNavItems = [
  {
    name: 'Trang cá nhân',
    href: '#',
  },
  {
    name: 'Cài đặt',
    href: '#',
  },
];

export default async function ProfileMenu() {
  const res = await auth();
  const user = await getUserByEmail(res?.user?.email);
  if (!user) return null;

  return (
    <div className='mt-8 flex flex-row items-center  gap-2 border-b-2 pb-4'>
      <Avatar>
        <AvatarImage src={user.avatar} />
        <AvatarFallback className='border-2 border-amber-700 bg-amber-200'>
          {getAbbreviation(user.firstName + ' ' + user.lastName)}
        </AvatarFallback>
      </Avatar>

      <NavMenu
        list={dropdownNavItems}
        title={user.firstName + ' ' + user.lastName}
        role={user.role}
      />
    </div>
  );
}

function NavMenu({
  title,
  role,
  list,
}: {
  title: string;
  role: Roles;
  list?: {
    name: string;
    href?: string;
  }[];
}) {
  const displayedRole = roleToText(role);

  return (
    <div className='group/nav relative flex cursor-pointer items-center'>
      <div className='flex flex-col'>
        <div className={'flex w-36 flex-row items-center justify-start gap-1 font-semibold'}>
          <p className='truncate'>{getShortName(title)}</p>
        </div>
        <span className='text-sm text-gray-700'>{displayedRole}</span>
      </div>

      {list && (
        <div className='transition-all duration-150 group-hover/nav:-rotate-90'>
          <BiSolidChevronDown fontSize={'1.2rem'} />
        </div>
      )}

      <div className='absolute right-2 top-0 hidden w-full pt-[calc(3rem+14px)] opacity-0 transition-all duration-200 group-hover/nav:block group-hover/nav:opacity-100'>
        <div className='relative whitespace-nowrap border-t-2 border-t-amber-700 bg-white text-left shadow-lg'>
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
