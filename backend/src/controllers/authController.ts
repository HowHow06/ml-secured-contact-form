import express from 'express';
import logger from '../utils/logger';

const signup = async (_req: express.Request, res: express.Response) => {
  logger.info('Server is starting');
  res.send('Signup');
};

export default {
  signup,
};
