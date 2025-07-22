import { createBrowserRouter } from 'react-router-dom'

// 전역 페이지
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'

// 큐레이션
import CurationCreatePage from '@/features/curation/pages/CurationCreatePage'
import CurationEditPage from '@/features/curation/pages/CurationEditPage'
import CurationDetailPage from '@/features/curation/pages/CurationDetailPage'
import CurationListPage from '@/features/curation/pages/CurationListPage'
import CuratorProfilePage from '@/features/curation/pages/CuratorProfilePage'

// 주문
import OrderCheckoutPage from '@/features/order/pages/OrderCheckoutPage'
import OrderCompletePage from '@/features/order/pages/OrderCompletePage'
import OrderHistoryPage from '@/features/order/pages/OrderHistoryPage'

// 수익
import RevenueDashboardPage from '@/features/revenue/pages/RevenueDashboardPage'
import SettlementRequestPage from '@/features/revenue/pages/SettlementRequestPage'
import SettlementHistoryPage from '@/features/revenue/pages/SettlementHistoryPage'

// 마이페이지
import MyProfilePage from '@/features/user/pages/MyPofilePage'

// 에러페이지
import NotFound from '@/shared/pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/curation',
    children: [
      { path: '', element: <CurationListPage /> },
      { path: 'create', element: <CurationCreatePage /> },
      { path: 'edit/:id', element: <CurationEditPage /> },
      { path: 'detail/:id', element: <CurationDetailPage /> },
      { path: 'curator/:userId', element: <CuratorProfilePage /> },
    ],
  },
  {
    path: '/order',
    children: [
      { path: 'checkout/:curationId', element: <OrderCheckoutPage /> },
      { path: 'complete', element: <OrderCompletePage /> },
      { path: 'history', element: <OrderHistoryPage /> },
    ],
  },
  {
    path: '/revenue',
    children: [
      { path: '', element: <RevenueDashboardPage /> },
      { path: 'settlement/request', element: <SettlementRequestPage /> },
      { path: 'settlement/history', element: <SettlementHistoryPage /> },
    ],
  },
  {
    path: '/mypage',
    element: <MyProfilePage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
