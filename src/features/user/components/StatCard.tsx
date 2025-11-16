interface StatCardProps {
  label: string
  value: number | string
  suffix?: string
  className?: string
}

export default function StatCard({ label, value, suffix, className = '' }: StatCardProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 bg-neutral-100 rounded-lg py-2.5 px-2 md:px-10 md:gap-8 md:border md:border-border md:rounded-xl md:p-10 md:bg-transparent ${className}`}
    >
      <p className='text-[10px] md:text-base font-medium text-center text-foreground/80'>{label}</p>
      <div className='flex items-end gap-1'>
        <span className='text-md md:text-2xl font-semibold text-foreground md:font-stat-value'>
          {value}
        </span>
        {suffix && (
          <span className='text-xs md:text-2xl font-medium text-foreground leading-none pb-0.5'>
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}
