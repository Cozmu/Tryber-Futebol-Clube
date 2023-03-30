import * as jwt from 'jsonwebtoken';
import { IUserResult } from '../database/models/interfaces/IUser.model';

const SECRETE = process.env.JWT_SECRET || 'COSMU';

const JWT_CONFIG:jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const createToken = (data:IUserResult) => jwt.sign({ data }, SECRETE, JWT_CONFIG);

const verifyToken = (token:string) => jwt.verify(token, SECRETE);
const authFunctions = { createToken, verifyToken };

export default authFunctions;
