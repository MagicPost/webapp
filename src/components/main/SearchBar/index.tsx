import { Input, InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React from 'react';
import { IoIosSearch } from 'react-icons/io';

const SearchBar = React.forwardRef<HTMLInputElement, InputProps>(function SearchBar(
  { className = '', placeholder = '', onKeyDown, defaultValue = '' },
  ref
) {
  return (
    <div className={cn('relative', className)}>
      <div className='absolute top-3 ps-4 text-lg text-gray-500'>
        <IoIosSearch />
      </div>
      <Input
        ref={ref}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className='ps-12'
        onKeyDown={onKeyDown}
        spellCheck={false}
      />
    </div>
  );
});

export default SearchBar;
