import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { packageFormSchema } from './schema';
import { z } from 'zod';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { PackageTypes, SpecialProperties } from '@/constants';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Fragment, HTMLInputTypeAttribute, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import CustomFormLabel from './CustomFormLabel';
import { Separator } from '@/components/ui/separator';

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
      <form className='w-full space-y-4 px-4 pt-8' onSubmit={(event) => event.preventDefault()}>
        <div className='flex flex-row gap-4'>
          <FormField
            control={form.control}
            name={'type'}
            render={({ field }) => (
              <FormItem className='w-1/3'>
                <CustomFormLabel htmlFor={field.name}>Loại kiện hàng</CustomFormLabel>
                <FormControl>
                  <RadioGroup defaultValue={field.value} onValueChange={field.onChange}>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value={PackageTypes.PARCEL} id='package_parcel' />
                      <Label htmlFor='package_parcel'>Bưu kiện</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value={PackageTypes.DOCUMENT} id='package_document' />
                      <Label htmlFor='package_document'>Tài liệu</Label>
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
                                onCheckedChange={(checked: boolean) => {
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

        <div className='mt-2 flex w-full flex-col space-y-2'>
          {form.watch('items').map((_, index) => (
            <Fragment key={index}>
              <Separator className='w-full text-secondary' />

              <div className='flex flex-col items-center gap-2 sm:flex-row'>
                <div className='flex w-full flex-col flex-wrap gap-2 md:flex-row'>
                  <ItemInputField
                    form={form}
                    index={index}
                    label={
                      <>
                        Tên hàng <span className='text-red-500'>*</span>
                      </>
                    }
                    placeholder='Nhập tên hàng'
                    fieldName='name'
                  />

                  <ItemInputField
                    form={form}
                    index={index}
                    label={
                      <>
                        Số lượng <span className='text-red-500'>*</span>
                      </>
                    }
                    fieldName='quantity'
                    type='number'
                  />

                  <ItemInputField
                    form={form}
                    index={index}
                    label={
                      <>
                        Khối lượng đơn (g) <span className='text-red-500'>*</span>
                      </>
                    }
                    fieldName='weight'
                    type='number'
                  />

                  <ItemInputField
                    form={form}
                    index={index}
                    label={
                      <>
                        Đơn giá (VNĐ) <span className='text-red-500'>*</span>
                      </>
                    }
                    fieldName='price'
                    type='number'
                  />
                </div>
                <Button
                  type='button'
                  variant='destructive'
                  className='px-4 py-2 max-sm:w-[100px]'
                  onClick={() => {
                    const items = form.getValues().items;
                    const newItems = items.filter((_, itemIndex) => itemIndex !== index);
                    form.reset({ ...form.watch(), items: [...newItems] });
                  }}
                >
                  <Trash2 className='h-5 w-5 sm:h-4 sm:w-4' />
                </Button>
              </div>
            </Fragment>
          ))}
        </div>

        <div className='flex h-full justify-center'>
          <Button
            type='button'
            variant='outline'
            className='mt-2 space-x-2 border-2 border-orange-400 px-4 py-2 text-base'
            onClick={() => {
              form.setValue('items', [
                ...form.getValues().items,
                {
                  name: '',
                  quantity: 0,
                  weight: 0,
                  price: 0,
                },
              ]);
            }}
          >
            <Plus size={16} />
            <span>Thêm hàng hóa</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}

function ItemInputField({
  form,
  index,
  type,
  placeholder,
  label,
  fieldName,
}: {
  form: UseFormReturn<z.infer<typeof packageFormSchema>>;
  index: number;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  label: string | JSX.Element;
  fieldName: keyof z.infer<typeof packageFormSchema>['items'][number];
}) {
  return (
    <FormField
      control={form.control}
      name={`items.${index}.${fieldName}`}
      render={({ field }) => {
        return (
          <FormControl>
            <div className='flex w-full basis-auto flex-col gap-2 sm:basis-[48%] min-[1350px]:basis-[23%]'>
              <FormLabel className='text-sm font-semibold'>{label}</FormLabel>
              <Input
                className='w-full rounded-md border border-gray-300 px-4 py-2'
                type={type}
                {...field}
                onChange={(event) => {
                  if (type === 'number') {
                    const actualValue = Number(event.target.value);
                    field.onChange(actualValue);
                    return;
                  }
                  const value = event.target.value;
                  field.onChange(value);
                }}
                placeholder={placeholder}
              />
              <FormMessage className='block text-xs' holdOn />
            </div>
          </FormControl>
        );
      }}
    />
  );
}
