import express from 'express';
import authRoute from './authRoute';
import healthcheckRoute from './healthcheckRoute';
import userRoute from './userRoute';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: healthcheckRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
