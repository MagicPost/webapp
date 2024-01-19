'use client';

import SearchBar from '@/components/main/SearchBar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { PackageSearch, SearchCheck } from 'lucide-react';
import { useRef, useState } from 'react';
import SearchResult from './SearchResult';

export default function OrderTrackingDialog({
  packageId: _packageId,
}: {
  packageId: string | null;
}) {
  const [open, setOpen] = useState(!!_packageId);
  const [packageId, setPackageId] = useState<string | null>(_packageId);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSearch = (value: string) => {
    if (!value) return;
    setPackageId(value);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)} defaultOpen={false}>
      <DialogTrigger
        asChild
        onClick={() => {
          setOpen(true);
        }}
      >
        <Button variant='default'>
          <span className='hidden min-[400px]:block'>Tra cứu đơn hàng</span>
          <PackageSearch className='text-sm min-[400px]:hidden min-[400px]:text-base' />
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className={cn(
          'h-[90vh] max-h-[900px] w-[96vw] max-w-[1600px] py-8 lg:w-[78vw]',
          'overflow-y-auto'
        )}
      >
        <div className='mt-0 flex h-full flex-col items-center gap-2'>
          <h2 className='my-4 text-base font-bold leading-4 min-[200px]:text-xl md:text-2xl'>
            Tra cứu đơn hàng
          </h2>
          <div className='mb-8 flex w-full flex-col gap-2 min-[300px]:flex-row'>
            <SearchBar
              className='w-full flex-1'
              ref={inputRef}
              defaultValue={packageId || ''}
              placeholder='Nhập mã đơn hàng'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSearch(e.currentTarget.value);
                }
              }}
            />
            <Button className='flex-0' onClick={(e) => onSearch(inputRef.current?.value || '')}>
              <SearchCheck className='mr-2 text-xs' />
              <span className='text-base'>Tra cứu</span>
            </Button>
          </div>
          {packageId && <SearchResult packageId={packageId} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
