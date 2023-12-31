import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';

export default function CustomInputField({
  form,
  name,
  label,
  placeholder,
  type = 'text',
  optional = false,
}: {
  form: UseFormReturn<any>;
  name: any;
  label: string;
  placeholder: string;
  type?: string;
  optional?: boolean;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-row items-center justify-between gap-4'>
          <FormLabel className='w-1/4'>
            {label} {!optional && <span className='text-red-500'>*</span>}
          </FormLabel>
          <div className='flex w-3/4 flex-col gap-1'>
            <FormControl>
              <Input className='w-full' placeholder={placeholder} type={type} {...field} />
            </FormControl>
            <FormMessage className='text-xs' />
          </div>
        </FormItem>
      )}
    />
  );
}
