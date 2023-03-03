import LoadingPage from './pages/LoadingPage';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Index = React.lazy(() => import('./pages/HomePage'));
const PostDetailsPage = React.lazy(() => import('./pages/PostDetailsPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));

const Loader = () => <LoadingPage />;

const Router: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path='/'
          element={
            <Suspense fallback={<Loader />}>
              <Index />
            </Suspense>
          }
        />
        <Route
          path='/dashboard'
          element={
            <Suspense fallback={<Loader />}>
              <DashboardPage />
            </Suspense>
          }
        />
        <Route
          path='/posts/:id'
          element={
            <Suspense fallback={<Loader />}>
              <PostDetailsPage />
            </Suspense>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default Router;
