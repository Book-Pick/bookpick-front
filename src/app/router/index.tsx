import { createBrowserRouter } from 'react-router-dom'

// 레이아웃
import { MainLayout, ContentsLayout, AuthLayout } from '@/app/layout'

// 전역 페이지
import HomePage from '@/pages/HomePage'
import LandingPage from '@/pages/LandingPage'
import UIPreview from '@/pages/UIPreview'

// 인증
import LoginPage from '@/features/auth/pages/LoginPage'
import RegisterPage from '@/features/auth/pages/RegisterPage'

// 큐레이션
import CurationCreatePage from '@/features/curation/pages/CurationCreatePage'
import CurationEditPage from '@/features/curation/pages/CurationEditPage'
import CurationDetailPage from '@/features/curation/pages/CurationDetailPage'
import CurationListPage from '@/features/curation/pages/CurationListPage'
import CuratorProfilePage from '@/features/curation/pages/CuratorProfilePage'
import ReadingPreferencePage from '@/features/curation/pages/ReadingPreferencePage'

// 주문
import OrderCheckoutPage from '@/features/order/pages/OrderCheckoutPage'
import OrderCompletePage from '@/features/order/pages/OrderCompletePage'
import OrderHistoryPage from '@/features/order/pages/OrderHistoryPage'

// 수익
import RevenueDashboardPage from '@/features/revenue/pages/RevenueDashboardPage'
import SettlementRequestPage from '@/features/revenue/pages/SettlementRequestPage'
import SettlementHistoryPage from '@/features/revenue/pages/SettlementHistoryPage'

// 마이페이지
import MyDashboardPage from '@/features/user/pages/MyDashboardPage'
import MyProfilePage from '@/features/user/pages/MyProfilePage'
import MyProfileEditPage from '@/features/user/pages/MyProfileEditPage'
import MyCurationPage from '@/features/user/pages/MyCurationPage'
import MyReadingHistoryPage from '@/features/user/pages/MyReadingHistoryPage'

// 에러페이지
import NotFound from '@/shared/pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/ui-preview',
        element: <UIPreview />,
      },
      {
        path: '/landing',
        element: <LandingPage />,
      },
      {
        path: '/',
        element: <ContentsLayout />,
        children: [
          {
            path: 'curation',
            children: [
              { index: true, element: <CurationListPage /> },
              { path: 'create', element: <CurationCreatePage /> },
              { path: 'edit/:id', element: <CurationEditPage /> },
              { path: 'detail/:id', element: <CurationDetailPage /> },
              { path: 'curator/:userId', element: <CuratorProfilePage /> },
            ],
          },
          {
            path: 'order',
            children: [
              { path: 'checkout/:curationId', element: <OrderCheckoutPage /> },
              { path: 'complete', element: <OrderCompletePage /> },
              { path: 'history', element: <OrderHistoryPage /> },
            ],
          },
          {
            path: 'revenue',
            children: [
              { index: true, element: <RevenueDashboardPage /> },
              { path: 'settlement/request', element: <SettlementRequestPage /> },
              { path: 'settlement/history', element: <SettlementHistoryPage /> },
            ],
          },
          {
            path: 'mypage',
            element: <MyProfilePage />,
            children: [
              { path: 'dashboard', element: <MyDashboardPage /> },
              { path: 'profile', element: <MyProfileEditPage /> },
              { path: 'curation', element: <MyCurationPage /> },
              { path: 'reading-history', element: <MyReadingHistoryPage /> },
            ],
          },
          {
            path: 'onboarding',
            children: [{ index: true, element: <ReadingPreferencePage /> }],
          },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
