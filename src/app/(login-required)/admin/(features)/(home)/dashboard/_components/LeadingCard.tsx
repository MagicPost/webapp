import Image from 'next/image';

export type LeadingRowProps = {
  image: {
    src: string;
    alt?: string;
  };
  name: string;
  description: string;
  indicator: {
    value: number | string;
    valueUnit: string;
  };
};

export type LeadingCardProps = {
  legend: {
    title: string;
    description: string;
  };
  rows: LeadingRowProps[];
};

export default function TopChart({ legend, rows }: LeadingCardProps) {
  return (
    <div className='w-full rounded-lg border p-4'>
      <div className='mb-4 '>
        <p className='text-lg font-bold'>{legend.title}</p>
        <p className='text-sm font-light'>{legend.description}</p>
      </div>
      <div>
        {rows.map((row, index) => (
          <ChartRow key={index} {...row} />
        ))}
      </div>
    </div>
  );
}

function ChartRow({ image, name, description, indicator }: LeadingRowProps) {
  return (
    <div className='flex flex-row py-2'>
      <Image
        src={image.src}
        alt={image?.alt || ''}
        width={0}
        height={0}
        sizes='100vw'
        className='mr-4 h-10 w-10 rounded-full'
      />

      <div className='flex flex-1 flex-col items-start justify-center gap-1'>
        <span className='text-sm font-semibold'>{name}</span>
        <span className='text-xs font-light'>{description}</span>
      </div>

      <div>
        <span className='text-xl font-semibold'>
          {typeof indicator.value === 'number' && indicator.value > 0 && '+'}
          {indicator.value}
        </span>{' '}
        <span className='text-base'>{indicator.valueUnit}</span>
      </div>
    </div>
  );
}
