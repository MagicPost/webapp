import { cn } from '@/lib/utils';
import { PackageTrackingActions, PackageTrackingActionsMap } from '@/constants/';
import { GetPackageDetailsDTO } from '@/dtos/package/package.dto';
import { getTimeString, getViLocaleDateString } from '@/lib/time';

enum TimelineType {
  PAST = 'past',
  CURRENT = 'current',
  FUTURE = 'future',
}

export default function TransitProgress({
  tracking,
}: {
  tracking: GetPackageDetailsDTO['tracking'];
}) {
  let currentIndex = 0;
  for (let i = 0; i < tracking.length; i++) {
    if (tracking[i].actions.length === 0) break;
    currentIndex = i;
  }

  return (
    <ol className='dark:border-primary-500 border-primary'>
      {tracking.map((log, index) => {
        return (
          <Timeline
            key={index}
            title={log.branch.name}
            actions={log.actions.map((action) => ({
              type: action.type,
              timestamp: String(action.createdAt),
            }))}
            type={
              index === currentIndex
                ? TimelineType.CURRENT
                : log.actions.length === 0
                  ? TimelineType.FUTURE
                  : TimelineType.PAST
            }
            isStart={index === tracking.length - 1}
          />
        );
      })}
    </ol>
  );
}

function Timeline({
  isStart,
  title,
  actions,
  description,
  type = TimelineType.PAST,
}: {
  isStart?: boolean;
  title: string;
  actions: {
    type: PackageTrackingActions;
    timestamp: string;
  }[];
  description?: string;
  type?: TimelineType;
}) {
  const isDelivered = actions.some((action) => action.type === PackageTrackingActions.DELIVERED);
  const isCancelled = actions.some((action) => action.type === PackageTrackingActions.CANCELLED);
  const isResent = actions.some((action) => action.type === PackageTrackingActions.RESENT);

  return (
    <li className={isStart ? 'border-l-0' : 'border-l-2'}>
      <div className='flex-start flex items-center'>
        <div
          className={cn(
            '-ml-[7px] -mt-2 mr-3 flex h-3 w-3 items-center justify-center rounded-full',
            {
              'bg-neutral-300': type === TimelineType.PAST,
              'bg-slate-600': type === TimelineType.FUTURE,
              'bg-lime-600 after:left-0 after:z-10 after:block after:h-3 after:w-3 after:animate-ping after:rounded-full after:bg-lime-600':
                type === TimelineType.CURRENT,
              'bg-green-600': isDelivered,
              'bg-red-600': isCancelled || isResent,
            }
          )}
        ></div>
        <h4 className='-mt-2 text-base font-semibold md:text-xl'>{title}</h4>
      </div>
      <div className='ml-6 pb-6'>
        <div className='flex flex-col gap-1'>
          {actions.map((action, index) => (
            <div key={index}>
              <span
                className={cn(
                  'hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600 text-primary',
                  'text-sm transition duration-150 ease-in-out md:text-base'
                )}
              >
                {getViLocaleDateString(action.timestamp)} {getTimeString(action.timestamp)}
              </span>
              <span className='text-sm md:text-base'>
                : {PackageTrackingActionsMap[action.type]}
              </span>
            </div>
          ))}
        </div>

        <p className='mb-4 mt-2 text-sm text-neutral-600 dark:text-neutral-300'>{description}</p>
      </div>
    </li>
  );
}
