import React, { Suspense } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


const LoginPage = React.lazy(() => import('./components/pages/Authorization/LoginPage'));
const SignupPage = React.lazy(() => import('./components/pages/Authorization/SignupPage'));
// const Layout = React.lazy(() => import('./components/Layout'));
const MainPage = React.lazy(() => import('./components/pages/MainPage/MainPage'));

import { UserProvider } from './context/auth';
import Loading from './components/ui/Loading';




function App() {
  return (
    <UserProvider>
      <BrowserRouter>
            <Routes>
           <Route
            path="/dashboard"
            element={
              <Suspense fallback={<Loading message="Загрузка страницы..." />}>
                <MainPage />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading message="Загрузка страницы..." />}>
                <MainPage />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<Loading message="Загрузка страницы..." />}>
                <SignupPage />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<Loading message="Загрузка страницы..." />}>
                <LoginPage />
              </Suspense>
            }
          />
        
        </Routes>        
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
