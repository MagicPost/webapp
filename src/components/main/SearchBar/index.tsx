import { Input } from '@/components/ui/input';
import { IoIosSearch } from 'react-icons/io';

export default function SearchBar({ placeholder = '' }: { placeholder?: string }) {
  return (
    <div className='relative'>
      <div className='absolute top-3 ps-4 text-lg text-gray-500'>
        <IoIosSearch />
      </div>
      <Input placeholder={placeholder} className='ps-12' />
    </div>
  );
}
