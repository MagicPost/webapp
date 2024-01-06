import { cn } from '@/lib/utils';
import { PackageTrackingActions, PackageTrackingActionsMap } from '@/constants/';

enum TimelineType {
  PAST = 'past',
  CURRENT = 'current',
  FUTURE = 'future',
}

export default function TransitProgress() {
  return (
    <ol className='dark:border-primary-500 border-primary'>
      <Timeline
        title='Điểm tập kết C1. Hà Nội'
        actions={[
          {
            type: PackageTrackingActions.RESENT,
            timestamp: '10:20:23 12/12/2021',
          },
          {
            type: PackageTrackingActions.DELIVERING,
            timestamp: '10:20:23 12/12/2021',
          },
          {
            type: PackageTrackingActions.ARRIVED,
            timestamp: '10:20:23 12/12/2021',
          },
        ]}
        type={TimelineType.CURRENT}
      />
      <Timeline
        title='Điểm tập kết C5. Thanh Hóa'
        actions={[
          {
            type: PackageTrackingActions.DEPARTED,
            timestamp: '10:20:23 12/12/2021',
          },
          {
            type: PackageTrackingActions.ARRIVED,
            timestamp: '10:20:23 12/12/2021',
          },
        ]}
        type={TimelineType.PAST}
      />
      <Timeline
        title='Điểm giao dịch T4. Hoằng Hóa: '
        actions={[
          {
            type: PackageTrackingActions.DEPARTED,
            timestamp: '10:20:23 12/12/2021',
          },
          {
            type: PackageTrackingActions.CREATED,
            timestamp: '10:20:23 12/12/2021',
          },
        ]}
        type={TimelineType.PAST}
      />
      <Timeline
        title='Điểm giao dịch T4. Hoằng Hóa: '
        actions={[
          {
            type: PackageTrackingActions.DEPARTED,
            timestamp: '10:20:23 12/12/2021',
          },
          {
            type: PackageTrackingActions.CREATED,
            timestamp: '10:20:23 12/12/2021',
          },
        ]}
        type={TimelineType.PAST}
        isStart
      />
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
              'bg-neutral-300 dark:bg-neutral-700': type === TimelineType.PAST,
              'dark:bg-primary-500 bg-primary': type === TimelineType.FUTURE,
              'bg-lime-400': type === TimelineType.CURRENT,
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
                  'hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600 text-primary ',
                  'text-sm transition duration-150 ease-in-out md:text-base'
                )}
              >
                {action.timestamp}
              </span>
              <span className='text-sm'>: {PackageTrackingActionsMap[action.type]}</span>
            </div>
          ))}
        </div>

        <p className='mb-4 mt-2 text-sm text-neutral-600 dark:text-neutral-300'>{description}</p>
      </div>
    </li>
  );
}
