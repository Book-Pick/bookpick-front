interface StatCardProps {
  label: string
  value: number | string
  suffix?: string
  className?: string
}

export default function StatCard({ label, value, suffix, className = '' }: StatCardProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-8 border border-border rounded-xl p-10 ${className}`}
    >
      <p className='font-label'>{label}</p>
      <div className='flex items-end gap-1'>
        <span className='font-stat-value'>{value}</span>
        {suffix && (
          <span className='text-lg md:text-xl font-medium text-foreground leading-none pb-0.5'>
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}
