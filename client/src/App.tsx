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
import ProfilePage from './components/pages/ProfilePage/ProfilePage';
import { Container } from '@mui/material';
import Loading from './components/ui/Loadint';

function App() {

  
  const router = createBrowserRouter([
    {
      element: (
    <Suspense fallback={<Loading message="Loading Layout..." />}>
      <Layout />
    </Suspense>
  ),
  children: [
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading message="Loading Main Page..." />}>
          <MainPage />
        </Suspense>
      ),
    },
    {
      path: "/signup",
      element: (
        <Suspense fallback={<Loading message="Loading Signup Page..." />}>
          <SignupPage />
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<Loading message="Loading Login Page..." />}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: "/profile",
      element: (
        <Suspense fallback={<Loading message="Loading Profile Page..." />}>
          <ProfilePage />
        </Suspense>
      ),
    },
  ]},
  ]);

  return (
    <Container sx={{bgcolor: "#F9ECFF", width:'100%', height: '100vh'}} >
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
    </Container>
  );
}

export default App;
