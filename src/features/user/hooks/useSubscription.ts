import { useMemo } from 'react'
import { useGetSubscriptions, useSubscribe } from './useUser'
import toast from 'react-hot-toast'

/**
 * 특정 큐레이터 구독 여부 확인 훅
 */
export const useIsSubscribed = (curatorId: number) => {
  const { data: subscriptions, isLoading } = useGetSubscriptions({ page: 0, size: 1000 })

  const isSubscribed = useMemo(() => {
    return subscriptions?.curators.some((c) => c.curatorId === curatorId) ?? false
  }, [subscriptions, curatorId])

  return { isSubscribed, isLoading }
}

/**
 * 구독 토글 훅 (구독/취소 + 상태 확인 통합)
 */
export const useSubscriptionToggle = (curatorId: number) => {
  const { isSubscribed, isLoading: isLoadingSubscription } = useIsSubscribed(curatorId)
  const { mutateAsync: subscribe, isPending: isSubscribing } = useSubscribe()

  const toggle = async () => {
    const response = await subscribe({ curatorId: curatorId })
    if (response?.data?.subscribed) {
      toast.success('구독되었습니다.')
    } else {
      toast.error('구독 취소되었습니다.')
    }
  }

  return {
    isSubscribed,
    toggle,
    isLoading: isLoadingSubscription || isSubscribing,
  }
}
