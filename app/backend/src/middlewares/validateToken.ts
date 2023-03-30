import { Request, Response, NextFunction } from 'express';
import authFunctions from '../auth/authFunctions';

const validateToken = (req:Request, res:Response, next:NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const payload = authFunctions.verifyToken(authorization);
    req.body.user = payload;
    return next();
  } catch (error) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
