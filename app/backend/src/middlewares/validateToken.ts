import { Request, Response, NextFunction } from 'express';
import authFunctions from '../auth/authFunctions';
import InvalidParamError from '../errors/invalide-params-error';

const validateToken = (req:Request, res:Response, next:NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new InvalidParamError('Token not found');
  }
  try {
    const payload = authFunctions.verifyToken(authorization);
    req.body.user = payload;
    return next();
  } catch (error) {
    throw new InvalidParamError('Token must be a valid token');
  }
};

export default validateToken;
