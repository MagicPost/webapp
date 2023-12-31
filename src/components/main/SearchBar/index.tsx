import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { IoIosSearch } from 'react-icons/io';

export default function SearchBar({
  classname = '',
  placeholder = '',
}: {
  classname?: string;
  placeholder?: string;
}) {
  return (
    <div className={cn('relative', classname)}>
      <div className='absolute top-3 ps-4 text-lg text-gray-500'>
        <IoIosSearch />
      </div>
      <Input placeholder={placeholder} className='ps-12' />
    </div>
  );
}
