import express from 'express';
import httpStatus from 'http-status';
import userService from 'src/services/userService';
import ApiError from 'src/utils/apiError';
import catchAsync from 'src/utils/catchAsync';

const submitContactForm = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const { fullname, dob, nric } = req.body;
    const currentUser = req.user;

    if (currentUser === undefined) {
      res.status(httpStatus.UNAUTHORIZED).send({ message: 'Invalid User' });
      return;
    }

    try {
      await userService.updateUser({
        ...currentUser,
        fullname: fullname,
        dob: dob,
        nric: nric,
      });
      res.status(httpStatus.OK).json({
        message: 'User updated successfully',
      });
    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update user.');
    }
  },
);

const getProfileFromToken = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const currentUser = req.user;

    if (currentUser === undefined) {
      res.status(httpStatus.UNAUTHORIZED).send({ message: 'Invalid User' });
      return;
    }

    res.status(httpStatus.OK).json({
      message: 'Authenticated user.',
      user: userService.extractUserProfile(currentUser),
    });
  },
);

export default {
  submitContactForm,
  getProfileFromToken,
};
