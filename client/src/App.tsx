import React, { Suspense } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const LoginPage = React.lazy(() => import('./components/pages/Authorization/LoginPage'));
const SignupPage = React.lazy(() => import('./components/pages/Authorization/SignupPage'));
const Layout = React.lazy(() => import('./components/Layout'));
const MainPage = React.lazy(() => import('./components/pages/MainPage/MainPage'));

import { UserProvider } from './context/auth';

function App() {
  
  const router = createBrowserRouter([
    {
      element: <Suspense fallback={<div>Loading...</div>}><Layout /></Suspense>,
      children: [
        {
          path: "/",
          element: <Suspense fallback={<div>Loading Main Page...</div>}><MainPage /></Suspense>,
        },
        {
          path: "/signup",
          element: <Suspense fallback={<div>Loading Signup Page...</div>}><SignupPage /></Suspense>, 
        },
        {
          path: "/login",
          element: <Suspense fallback={<div>Loading Login Page...</div>}><LoginPage /></Suspense>,
        },
      ],
    },
  ]);

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
