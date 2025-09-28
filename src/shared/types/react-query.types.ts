import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'

export type QueryOptions<T, Q> = Omit<UseQueryOptions<T, Error, Q>, 'queryKey' | 'queryFn'>

export type MutationOptions<T, V, C = unknown> = Omit<
  UseMutationOptions<T, Error, V, C>,
  'mutationFn'
>
