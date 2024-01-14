'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import CustomSelect from '@/components/main/CustomSelect';
import CustomInput from '@/components/main/CustomInput';
import { provinces } from '@/constants/geography';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo } from 'react';
import { GetCollectionPointDTO } from '@/dtos/branches/collection-point.dto';

const formSchema = z.object({
  province: z.string().optional(),
  district: z.string().optional(),
  searchInput: z.string().optional(),
});

export const Filter = ({
  savedCollectionPoints,
  setFilteredCollectionPoints,
}: {
  savedCollectionPoints: GetCollectionPointDTO[];
  setFilteredCollectionPoints: Dispatch<SetStateAction<GetCollectionPointDTO[]>>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      province: undefined,
      district: undefined,
      searchInput: '',
    },
  });

  const doFilter = useCallback(() => {
    const filter = form.watch();

    const filtered = filter.province
      ? savedCollectionPoints.filter((item) => {
          const matchProvince =
            filter.province === 'ALL' ? true : item.province === filter.province;
          const matchDistrict =
            filter.province === 'ALL'
              ? true
              : !filter.district
                ? true
                : item.district === filter.district;
          const matchAddress = !filter.searchInput
            ? true
            : item.address.includes(filter.searchInput!);
          const matchName = !filter.searchInput ? true : item.name.includes(filter.searchInput!);
          const matchPostalCode = !filter.searchInput
            ? true
            : item.postalCode.includes(filter.searchInput!);

          return matchProvince && matchDistrict && (matchAddress || matchName || matchPostalCode);
        })
      : savedCollectionPoints;
    setFilteredCollectionPoints(filtered);
  }, []);

  useEffect(() => {
    form.setValue('district', undefined);
    doFilter();
  }, [form.watch('province')]);

  useEffect(() => void doFilter(), [form.watch('district')]);
  useEffect(() => void doFilter(), [form.watch('searchInput')]);

  const provinceOptions = useMemo(() => {
    return [
      { label: 'Tất cả', value: 'ALL' },
      ...provinces.map((province) => {
        return { label: province.name, value: province.name };
      }),
    ];
  }, []);

  const districtOptions = useMemo(() => {
    if (!form.watch('province')) return [];
    return [
      { label: 'Tất cả', value: 'ALL' },
      ...(provinces
        .filter((province) => province.name === form.watch('province'))[0]
        ?.districts.map((district) => {
          return { label: district.name, value: district.name };
        }) || []),
    ];
  }, [form.watch('province')]);

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className='flex w-full flex-col gap-4 rounded-md bg-yellow-100 p-4 shadow-sm md:flex-row md:items-center'
      >
        <strong> Bộ lọc: </strong>
        <div>
          <CustomSelect
            name='province'
            control={form.control}
            options={provinceOptions}
            placeholder='Tỉnh/Thành phố'
            selectClassname='w-full border-orange-600'
          />
        </div>
        <div>
          <CustomSelect
            name='district'
            control={form.control}
            options={districtOptions}
            placeholder='Quận/Huyện'
            selectClassname='w-full border-orange-600'
          />
        </div>

        <Label
          htmlFor='searchInput'
          className='flex w-full items-center gap-2 rounded-md border border-orange-600 bg-background px-2 md:ml-auto md:w-[300px]'
        >
          <CustomInput
            name='searchInput'
            control={form.control}
            placeholder='Tên, địa chỉ, mã bưu chính'
            containerClassname='w-full'
            inputClassname='w-full border-0'
          />

          <Search size={16} />
        </Label>
      </form>
    </Form>
  );
};
