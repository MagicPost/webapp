import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Plus } from 'lucide-react';
import { Control } from 'react-hook-form';
import { useState } from 'react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CustomComboBox({
  options,
  control,
  name,
  label,
  description,
  labelClassName,
  selectClassName,
  inputValue,
  contentClassName,
  onInputChange,
  onValueChange,
  placeholder,
}: {
  control: Control<any>;
  options: {
    label: string;
    value: string;
  }[];
  name: string;
  label: string;
  description?: string;
  selectClassName?: string;
  labelClassName?: string;
  onInputChange?: (value: string) => void;
  inputValue?: string;
  contentClassName?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex w-full flex-col'>
          <FormLabel className={cn(labelClassName)}>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  type='button'
                  variant='outline'
                  role='combobox'
                  onClick={() => {
                    setOpen(!open);
                  }}
                  className={cn(
                    'w-[200px] justify-between',
                    !field.value && 'mt-2 text-muted-foreground',
                    selectClassName
                  )}
                >
                  {field.value && options?.length > 0
                    ? options?.find((option) => option.value === field.value)?.label ?? field.value
                    : placeholder}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className={cn('border p-2', contentClassName)}>
              <div>
                <Input
                  placeholder={placeholder}
                  className='rounded-none border-0 border-b focus-visible:ring-0'
                  value={inputValue}
                  onChange={(e) => {
                    onInputChange && onInputChange(e.target.value);
                  }}
                />
                <div>
                  {options.map((option) => (
                    <Button
                      type='button'
                      value={option.label}
                      key={option.value}
                      onClick={() => {
                        field.onChange(option.value);
                        onValueChange && onValueChange(option.value);
                        setOpen(false);
                      }}
                      className='w-full justify-start rounded-none border-0 bg-transparent text-left text-current hover:bg-gray-100'
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 shrink-0 grow-0',
                          option.value === field.value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {option.label}
                    </Button>
                  ))}
                  {inputValue && (
                    <Button
                      type='button'
                      onClick={() => {
                        field.onChange(inputValue);
                        onValueChange && onValueChange(inputValue);
                        setOpen(false);
                      }}
                      className='w-full justify-start rounded-none border-0 bg-transparent text-left text-current hover:bg-gray-100'
                    >
                      <Plus className={cn('mr-2 h-4 w-4 shrink-0 grow-0')} />
                      Add {inputValue}
                    </Button>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
