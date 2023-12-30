import { UseFormReturn } from 'react-hook-form';
import { serviceFormSchema } from './page';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { PickupTime, PlusServiceTypes, TransitServiceTypes } from '@/constants';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CustomFormLabel from './CustomFormLabel';

const plusServices = [
  {
    id: PlusServiceTypes.INSURANCE,
    label: 'Bảo hiểm hàng hóa',
  },
  {
    id: PlusServiceTypes.REFUND,
    label: 'Dịch vụ hoàn cước',
  },
];

const pickupTimes = [
  {
    id: PickupTime.ALL_DAY,
    label: 'Cả ngày',
  },
  {
    id: PickupTime.MORNING,
    label: 'Buổi sáng',
  },
  {
    id: PickupTime.AFTERNOON,
    label: 'Buổi chiều',
  },
  {
    id: PickupTime.EVENING,
    label: 'Buổi tối',
  },
  {
    id: PickupTime.SUNDAY,
    label: 'Chủ nhật',
  },
  {
    id: PickupTime.TIME_IN_WORKS,
    label: 'Giờ hành chính',
  },
];

export default function ServiceForm({
  form,
}: {
  form: UseFormReturn<z.infer<typeof serviceFormSchema>>;
}) {
  return (
    <Form {...form}>
      <form className='space-y-4 px-4 pt-8'>
        <div className='flex flex-row flex-wrap gap-4'>
          <FormField
            control={form.control}
            name={'transit'}
            render={({ field }) => (
              <FormItem className='flex-2'>
                <CustomFormLabel htmlFor={field.name}>Dịch vụ chính</CustomFormLabel>
                <FormControl>
                  <RadioGroup
                    defaultValue={TransitServiceTypes.ECONOMICAL}
                    onValueChange={field.onChange}
                  >
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value={TransitServiceTypes.ECONOMICAL} id='r1' />
                      <Label htmlFor='r1'>Tiết kiệm</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value={TransitServiceTypes.STANDARD} id='r2' />
                      <Label htmlFor='r2'>Tiêu chuẩn</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value={TransitServiceTypes.EXPRESS} id='r3' />
                      <Label htmlFor='r3'>Hỏa tốc</Label>
                    </div>
                  </RadioGroup>
                </FormControl>

                <div className='mt-2 flex items-center gap-2'>
                  <span> Thời gian giao hàng dự kiến:</span>
                  <span className='font-medium'> 2 - 3 ngày</span>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={'plus'}
            render={({ field }) => (
              <FormItem className='flex-1'>
                <CustomFormLabel htmlFor={field.name}>Dịch vụ cộng thêm</CustomFormLabel>
                {plusServices.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name={`plus.${item.id}`}
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className='flex flex-row items-start space-x-3 space-y-0'
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                return field.onChange(checked);
                              }}
                            />
                          </FormControl>
                          <FormLabel className='font-normal'>{item.label}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={'payer'}
            render={({ field }) => (
              <FormItem className='flex-1'>
                <CustomFormLabel htmlFor={field.name}>Người trả phí</CustomFormLabel>
                <FormControl>
                  <RadioGroup
                    defaultValue={TransitServiceTypes.ECONOMICAL}
                    onValueChange={field.onChange}
                  >
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value={TransitServiceTypes.ECONOMICAL} id='r1' />
                      <Label htmlFor='r1'>Người gửi trả</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value={TransitServiceTypes.STANDARD} id='r2' />
                      <Label htmlFor='r2'>Người nhận trả</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-wrap gap-4'>
          <FormField
            control={form.control}
            name={'COD'}
            render={({ field }) => (
              <FormItem className='flex-1'>
                <CustomFormLabel htmlFor={field.name}>Tiền thu hộ</CustomFormLabel>
                <FormControl>
                  <Input {...field} placeholder='Số tiền thu hộ' className='w-[240px]' />
                </FormControl>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='terms' />
                  <label
                    htmlFor='terms'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Thu hộ bằng tiền hàng
                  </label>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'pickupTime'}
            render={({ field }) => (
              <FormItem className='flex-1'>
                <CustomFormLabel htmlFor={field.name}>
                  Thời gian giao hàng mong muốn
                </CustomFormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Chọn khung thời gian phù hợp' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {pickupTimes.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name={'note'}
          render={({ field }) => (
            <FormItem className='flex-1'>
              <CustomFormLabel htmlFor={field.name}>Ghi chú</CustomFormLabel>
              <FormControl>
                <textarea
                  {...field}
                  className='w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300'
                  placeholder='Ghi chú đơn hàng'
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
