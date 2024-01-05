import { UseFormReturn } from 'react-hook-form';
import { serviceFormSchema } from './schema';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Payer, PickupTime, PlusServiceTypes, TransitServiceTypes } from '@/constants';
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
import { Textarea } from '@/components/ui/textarea';

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
  totalPackagePrice,
}: {
  form: UseFormReturn<z.infer<typeof serviceFormSchema>>;
  totalPackagePrice: number;
}) {
  return (
    <Form {...form}>
      <form className='space-y-4 px-4 pt-8' onSubmit={(event) => event.preventDefault()}>
        <div className='flex flex-row flex-wrap gap-4'>
          <FormField
            control={form.control}
            name={'transit'}
            render={({ field }) => (
              <FormItem className='flex-2'>
                <CustomFormLabel htmlFor={field.name}>Dịch vụ chính</CustomFormLabel>
                <FormControl>
                  <RadioGroup defaultValue={field.value} onValueChange={field.onChange}>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem
                        value={TransitServiceTypes.ECONOMICAL}
                        id='transit_economical'
                      />
                      <Label htmlFor='transit_economical'>Tiết kiệm</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value={TransitServiceTypes.STANDARD} id='transit_standard' />
                      <Label htmlFor='transit_standard'>Tiêu chuẩn</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value={TransitServiceTypes.EXPRESS} id='transit_express' />
                      <Label htmlFor='transit_express'>Hỏa tốc</Label>
                    </div>
                  </RadioGroup>
                </FormControl>

                <div className='mt-2 flex items-center gap-2 italic'>
                  <span className='text-sm'>Thời gian giao hàng dự kiến:</span>
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
                  <RadioGroup defaultValue={field.value} onValueChange={field.onChange}>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value={Payer.SENDER} id='sender_pays' />
                      <Label htmlFor='sender_pays'>Người gửi trả</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value={Payer.RECEIVER} id='receiver_pay' />
                      <Label htmlFor='receiver_pay'>Người nhận trả</Label>
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
                <CustomFormLabel htmlFor={field.name}>Tiền thu hộ</CustomFormLabel>{' '}
                <span className='text-xs'>(miễn phí)</span>
                <div className="flex items-center after:top-1 after:-translate-x-[calc(100%+40px)] after:text-sm after:text-gray-500 after:content-['VNĐ']">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Số tiền thu hộ'
                      className='w-full max-w-[240px]'
                      type='number'
                      onChange={(event) => {
                        const value = Number(event.target.value);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='terms'
                    onCheckedChange={(checked) =>
                      checked ? form.setValue('COD', totalPackagePrice) : form.setValue('COD', 0)
                    }
                  />
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <Textarea {...field} placeholder='Ghi chú đơn hàng' />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
