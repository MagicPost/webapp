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
    href: '/profile',
  },
  {
    name: 'Cài đặt',
    href: '/settings',
  },
];

export default async function ProfileMenu() {
  const res = await auth();
  const user = await getUserByEmail(res?.user?.email);
  if (!user) return null;

  return (
    <div className='flex flex-row items-center gap-2'>
      <Avatar>
        <AvatarImage src={user.avatar} />
        <AvatarFallback>{getAbbreviation(user.firstName + ' ' + user.lastName)}</AvatarFallback>
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
    <div className='group/nav relative flex flex-col gap-4 '>
      <div className='flex flex-col'>
        <div className={'flex w-36 flex-row items-center justify-start gap-1 font-semibold'}>
          <p className='truncate'>{getShortName(title)}</p>
          {list && (
            <div className='transition-all group-hover/nav:-rotate-90'>
              <BiSolidChevronDown fontSize={'1.2rem'} />
            </div>
          )}
        </div>
        <span className='text-sm text-gray-700'>{displayedRole}</span>
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
