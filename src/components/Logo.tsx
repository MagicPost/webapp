import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return <h1 className={cn('text-2xl font-bold', className)}>MagicPost</h1>;
}
