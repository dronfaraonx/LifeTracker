import React, { Suspense } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


const LoginPage = React.lazy(() => import('./components/pages/Authorization/LoginPage'));
const SignupPage = React.lazy(() => import('./components/pages/Authorization/SignupPage'));
// const Layout = React.lazy(() => import('./components/Layout'));
const Dashboard = React.lazy(() => import('./components/pages/Dashboard/Dashboard'));

import { UserProvider } from './context/auth';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';
import Loading from './components/ui/Loading';
import Header from './components/ui/Header';



function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header/>
        <Routes>
           <Route
            path="/dashboard"
            element={
              <Suspense fallback={<Loading message="Loading Dashboard..." />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading message="Loading Dashboard..." />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<Loading message="Loading Signup Page..." />}>
                <SignupPage />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<Loading message="Loading Login Page..." />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<Loading message="Loading Profile Page..." />}>
                <ProfilePage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
