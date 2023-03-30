import { NextFunction, Request, Response } from 'express';

const requestRequiredFields = {
  user: ['email', 'password'],
};

const validateRequiredFields = (key: keyof typeof requestRequiredFields) =>
  (req:Request, res:Response, next:NextFunction): Response | void => {
    const requiredFields = requestRequiredFields[key];
    for (let index = 0; index < requiredFields.length; index += 1) {
      if (!req.body[requiredFields[index]]) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }
    }
    return next();
  };

export default validateRequiredFields;
