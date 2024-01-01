import { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { HTMLInputTypeAttribute } from 'react';

export default function CustomInput({
  label,
  placeholder,
  inputClassname,
  containerClassname,
  control,
  type,
  disabled,
  name,
  onTextChange,
}: {
  label?: string;
  placeholder?: string;
  inputClassname?: string;
  containerClassname?: string;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
  control: Control<any>;
  name: string;
  onTextChange?: (value: string) => void;
}) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', containerClassname)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              id={name}
              className={cn('w-[200px] justify-between focus:ring-0', inputClassname)}
              {...(onTextChange && {
                onChange: (e) => onTextChange(e.target.value),
              })}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
