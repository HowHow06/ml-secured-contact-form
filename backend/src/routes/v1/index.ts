import express from 'express';
import authRoute from './authRoute';
import healthcheckRoute from './healthcheckRoute';

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
];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
