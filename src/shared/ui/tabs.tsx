import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/shared/lib/utils'

type TabsVariant = 'default' | 'button'

const TabsContext = React.createContext<{ variant: TabsVariant; fullWidth: boolean }>({
  variant: 'default',
  fullWidth: true,
})

interface TabsProps extends React.ComponentProps<typeof TabsPrimitive.Root> {
  variant?: TabsVariant
  fullWidth?: boolean
}

function Tabs({ className, variant = 'default', fullWidth, ...props }: TabsProps) {
  // variant에 따른 기본 fullWidth 값 설정
  const defaultFullWidth = variant === 'default' ? true : false
  const finalFullWidth = fullWidth ?? defaultFullWidth

  return (
    <TabsContext.Provider value={{ variant, fullWidth: finalFullWidth }}>
      <TabsPrimitive.Root
        data-slot='tabs'
        className={cn('flex flex-col gap-2', className)}
        {...props}
      />
    </TabsContext.Provider>
  )
}

const tabsListVariants = cva('inline-flex items-center relative', {
  variants: {
    variant: {
      default: 'justify-start border-b border-border bg-transparent p-0',
      button: 'justify-center gap-1 rounded-full border border-border bg-muted/30 p-1',
    },
    fullWidth: {
      true: 'w-full',
      false: 'w-fit',
    },
  },
  defaultVariants: {
    variant: 'default',
    fullWidth: true,
  },
})

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  const { variant, fullWidth } = React.useContext(TabsContext)
  return (
    <TabsPrimitive.List
      data-slot='tabs-list'
      className={cn(tabsListVariants({ variant, fullWidth }), className)}
      {...props}
    />
  )
}

const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-medium text-muted-foreground transition-all hover:text-foreground disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:font-semibold relative -mb-px',
        button:
          'rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm',
      },
      size: {
        sm: 'px-2 py-2 text-xs',
        default: 'px-3 py-3 text-sm',
        lg: 'px-4 py-4 text-md',
      },
    },
    compoundVariants: [
      {
        variant: 'button',
        size: 'default',
        className: 'px-6 py-2',
      },
      {
        variant: 'button',
        size: 'sm',
        className: 'px-4 py-1.5',
      },
      {
        variant: 'button',
        size: 'lg',
        className: 'px-8 py-2.5',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

interface TabsTriggerProps
  extends React.ComponentProps<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

function TabsTrigger({ className, size, ...props }: TabsTriggerProps) {
  const { variant } = React.useContext(TabsContext)
  return (
    <TabsPrimitive.Trigger
      data-slot='tabs-trigger'
      className={cn(tabsTriggerVariants({ variant, size }), className)}
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
