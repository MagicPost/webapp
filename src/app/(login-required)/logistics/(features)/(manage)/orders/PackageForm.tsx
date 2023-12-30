import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { packageFormSchema } from './page';
import { z } from 'zod';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { PackageTypes, SpecialProperties } from '@/constants';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { HTMLInputTypeAttribute } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import CustomFormLabel from './CustomFormLabel';

const specialProps = [
  {
    id: SpecialProperties.HIGHVALUE,
    label: 'Hàng có giá trị cao',
  },
  {
    id: SpecialProperties.FRAGILE,
    label: 'Hàng dễ vỡ',
  },
  {
    id: SpecialProperties.LIQUID,
    label: 'Hàng lỏng',
  },
  {
    id: SpecialProperties.PERISHABLE,
    label: 'Hàng dễ hỏng',
  },
  {
    id: SpecialProperties.BULKY,
    label: 'Hàng cồng kềnh',
  },
];

export default function PackageForm({
  form,
}: {
  form: UseFormReturn<z.infer<typeof packageFormSchema>>;
}) {
  return (
    <Form {...form}>
      <form className='space-y-4 px-4 pt-8'>
        <div className='flex flex-row gap-4'>
          <FormField
            control={form.control}
            name={'type'}
            render={({ field }) => (
              <FormItem className='w-1/3 '>
                <CustomFormLabel htmlFor={field.name}>Loại kiện hàng</CustomFormLabel>
                <FormControl>
                  <RadioGroup defaultValue={PackageTypes.PARCEL} onValueChange={field.onChange}>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value={PackageTypes.PARCEL} id='r1' />
                      <Label htmlFor='r1'>Bưu kiện</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value={PackageTypes.DOCUMENT} id='r2' />
                      <Label htmlFor='r2'>Tài liệu</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={'specialNotes'}
            render={({ field }) => (
              <FormItem>
                <CustomFormLabel htmlFor={field.name}>Tính chất hàng hóa đặc biệt</CustomFormLabel>
                <div className='flex flex-wrap'>
                  {specialProps.map((specialProp) => (
                    <FormField
                      key={specialProp.id}
                      control={form.control}
                      name={`specialNotes.${specialProp.id}`}
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={specialProp.id}
                            className='mb-2 flex basis-1/2 flex-row items-start space-x-3 space-y-0'
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={(checked) => {
                                  return field.onChange(checked);
                                }}
                              />
                            </FormControl>
                            <FormLabel className='font-normal'>{specialProp.label}</FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
              </FormItem>
            )}
          />
        </div>

        <div>
          <CustomFormLabel htmlFor='items'>Hàng hóa</CustomFormLabel>
          <div className='mt-2 flex flex-col space-y-4'>
            <ItemInput />
            <ItemInput />
            <ItemInput />
          </div>
        </div>

        <div className='flex h-full justify-center'>
          <AddItemButton />
        </div>
      </form>
    </Form>
  );
}

function ItemInput() {
  return (
    <div className='flex flex-row items-center space-x-4'>
      <InputElement label='Tên hàng' />
      <InputElement label='Số lượng' type='number' />
      <InputElement label='Khối lượng' type='number' />
      <InputElement label='Giá trị' type='number' />

      <Button type='button' variant='destructive' className='mt-6 px-4 py-2'>
        <Trash2 size={16} />
      </Button>
    </div>
  );
}

function InputElement({ label, type }: { label: string; type?: HTMLInputTypeAttribute }) {
  return (
    <div className='flex w-1/2 flex-col gap-2'>
      <Label className='text-sm font-semibold'>{label}</Label>
      <Input className='w-full rounded-md border border-gray-300 px-4 py-2' type={type} />
    </div>
  );
}

function AddItemButton() {
  return (
    <Button
      type='button'
      variant='outline'
      className='mt-6 space-x-2 border-2 border-orange-400 px-4 py-2 text-base'
    >
      <Plus size={16} />
      <span>Thêm hàng hóa</span>
    </Button>
  );
}
