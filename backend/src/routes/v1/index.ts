import express from 'express';
import healthcheckRoute from './healthcheckRoute';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: healthcheckRoute,
  },
];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
