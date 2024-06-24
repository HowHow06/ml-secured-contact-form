import express from 'express';
import healthcheckController from 'src/controllers/healthcheckController';

const router = express.Router();

/* GET home page. */
router.get('/healthcheck', healthcheckController.healthCheck);

export default router;
