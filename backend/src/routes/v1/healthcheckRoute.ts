import express from 'express';
import healthcheckController from 'src/controllers/healthcheckController';

const router = express.Router();

/* GET home page. */
router.get('/', healthcheckController.healthCheck);

export default router;
