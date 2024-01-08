import { FormLabel } from '@/components/ui/form';
import { cn } from '@/lib/utils';

export default function CustomFormLabel({
  htmlFor,
  children,
  className = '',
}: {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <FormLabel htmlFor={htmlFor} className={cn('text-sm font-semibold uppercase', className)}>
      {children}
    </FormLabel>
  );
}
