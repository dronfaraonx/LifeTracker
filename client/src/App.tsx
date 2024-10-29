import React, { Suspense } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

const MainPage = React.lazy(() => import('./components/pages/MainPage/MainPage'));
const LoginPage = React.lazy(() => import('./components/pages/Authorization/LoginPage'));
const SignupPage = React.lazy(() => import('./components/pages/Authorization/SignupPage'));
const ShopList = React.lazy(() => import('./components/pages/ShopList/ShopList'));
const ShopItem = React.lazy(() => import('./components/pages/ShopItem/ShopItem'));
const Loading = React.lazy(() => import('./components/ui/Loading'));
const Layout = React.lazy(() => import('./components/Layout')); 
const Cart = React.lazy(() => import('./components/pages/Cart/Cart'));
const BuyerPage = React.lazy(() => import('./components/pages/BuyerPage/BuyerPage'));

import { UserProvider } from './context/auth';
import { CartCounterProvider } from './context/CountCart';
import { store } from './redux/store';

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
          path: "/account",
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
    <Provider store={store}>
      <CartCounterProvider>
              <RouterProvider router={router} /> 
      </CartCounterProvider>
    </Provider>
  );
}

export default App;
