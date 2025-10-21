
import { RouteObject } from 'react-router-dom';
import Home from '../pages/home/page';
import Dashboard from '../pages/dashboard/page';
import Control from '../pages/control/page';
import NotFound from '../pages/NotFound';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/control',
    element: <Control />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
