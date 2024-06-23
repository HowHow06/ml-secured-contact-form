import express from 'express';
import userService from 'src/services/userService';

const submitContactForm = async (
  req: express.Request,
  res: express.Response,
) => {
  const { fullname, dob, nric } = req.body;
  const currentUser = req.user;

  if (currentUser === undefined) {
    res.status(401).send({ message: 'Invalid User' });
    return;
  }

  try {
    await userService.updateUser({
      ...currentUser,
      fullname: fullname,
      dob: dob,
      nric: nric,
    });
    res.status(200).json({
      message: 'User updated successfully',
    });
  } catch (error) {
    res.status(400).send({ error });
  }
};

const getProfileFromToken = async (
  req: express.Request,
  res: express.Response,
) => {
  const currentUser = req.user;

  if (currentUser === undefined) {
    res.status(401).send({ message: 'Invalid User' });
    return;
  }

  res.status(200).json({
    message: 'Authenticated user.',
    user: userService.extractUserProfile(currentUser),
  });
};

export default {
  submitContactForm,
  getProfileFromToken,
};
