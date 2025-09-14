import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/shared/lib/utils'

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot='tabs'
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot='tabs-list'
      className={cn(
        'inline-flex items-center justify-start w-full border-b border-border bg-transparent p-0 relative',
        className,
      )}
      {...props}
    />
  )
}

const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-none border-b-2 border-transparent font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:font-semibold disabled:pointer-events-none disabled:opacity-50 relative -mb-px',
  {
    variants: {
      size: {
        sm: 'px-2 py-2 text-xs',
        default: 'px-3 py-3 text-sm',
        lg: 'px-4 py-4 text-md',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

interface TabsTriggerProps
  extends React.ComponentProps<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

function TabsTrigger({ className, size, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot='tabs-trigger'
      className={cn(tabsTriggerVariants({ size }), className)}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot='tabs-content'
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsTriggerVariants }
