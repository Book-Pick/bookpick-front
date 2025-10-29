interface StatCardProps {
  label: string
  value: number | string
  suffix?: string
  className?: string
}

export default function StatCard({ label, value, suffix, className = '' }: StatCardProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 md:gap-8 border border-border rounded-xl p-4 md:p-10 ${className}`}
    >
      <p className='text-xs md:text-sm font-medium text-center'>{label}</p>
      <div className='flex items-end gap-1'>
        <span className='font-stat-value'>{value}</span>
        {suffix && (
          <span className='text-sm md:text-lg font-medium text-foreground leading-none pb-0.5'>
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}
