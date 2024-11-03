import React, { Suspense } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const MainPage = React.lazy(() => import('./components/pages/MainPage/MainPage'));
const LoginPage = React.lazy(() => import('./components/pages/Authorization/LoginPage'));
const SignupPage = React.lazy(() => import('./components/pages/Authorization/SignupPage'));
const ShopList = React.lazy(() => import('./components/pages/ShopList/ShopList'));
const ShopItem = React.lazy(() => import('./components/pages/ShopItem/ShopItem'));
const Loading = React.lazy(() => import('./components/ui/Loading'));
const Layout = React.lazy(() => import('./components/Layout')); 
const Cart = React.lazy(() => import('./components/pages/Cart/Cart'));
const BuyerPage = React.lazy(() => import('./components/pages/BuyerPage/BuyerPage'));
const ClonesPage = React.lazy(() => import('./components/pages/ClonesPage/ClonesPage'))
const OrderDashboard = React.lazy(() => import('./components/pages/BuyerPage/OrderDashboard'))
const PlantsPage = React.lazy(() => import('./components/pages/PlantsPage/PlantsPage'))
const SeedPage = React.lazy(() => import('./components/pages/SeedPage/SeedPage'))
const FAQPage = React.lazy(() => import('./components/pages/BuyerPage/FaqPage'))

import { UserProvider } from './context/auth';
import { CartCounterProvider } from './context/CountCart';
import PersonalInfoPage from './components/pages/BuyerPage/PersonalInfoPage';



function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<Loading />}>
              <MainPage />
            </Suspense>
          ),
        },
        {
          path: "/signup",
          element: (
            <Suspense fallback={<Loading />}>
              <SignupPage />
            </Suspense>
          ),
        },
        {
          path: "/login",
          element: (
            <Suspense fallback={<Loading />}>
              <LoginPage />
            </Suspense>
          ),
        },
        {
          path: "/plants",
          element: (
            <Suspense fallback={<Loading />}>
              <ShopList />
            </Suspense>
          ),
        },
        {
          path: "/allclones",
          element: (
            <Suspense fallback={<Loading />}>
              <ClonesPage />
            </Suspense>
          ),
        },
        {
          path: "/allseeds",
          element: (
            <Suspense fallback={<Loading />}>
              <SeedPage />
            </Suspense>
          ),
        },
        {
          path: "/allplants",
          element: (
            <Suspense fallback={<Loading />}>
              <PlantsPage />
            </Suspense>
          ),
        },
        {
          path: "/plants/:id",
          element: (
            <Suspense fallback={<Loading />}>
              <ShopItem />
            </Suspense>
          ),
        },
        {
          path: "/cart/:id",
          element: (
            <Suspense fallback={<Loading/>}>
              <Cart />
            </Suspense>
          )
        },
        {
          path: "/dashboard",
          element: (
            <Suspense fallback={<Loading/>}>
              <OrderDashboard/>
            </Suspense>
          )
        },
        {
          path: "/myaccount",
          element: (
            <Suspense fallback={<Loading/>}>
              <PersonalInfoPage/>
            </Suspense>
          )
        },
         {
          path: "/info",
          element: (
            <Suspense fallback={<Loading/>}>
              <FAQPage/>
            </Suspense>
          )
        },

         {
          path: "/order-details/:uuid_order",
          element: (
            <Suspense fallback={<Loading/>}>
                <BuyerPage />
            </Suspense>
          )
        }
      ],
    },
  ]);

  return (
    <UserProvider>
      <CartCounterProvider>
              <RouterProvider router={router} /> 
      </CartCounterProvider>
    </UserProvider>
  );
}

export default App;
