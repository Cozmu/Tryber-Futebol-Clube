import * as jwt from 'jsonwebtoken';

const SECRETE = process.env.JWT_SECRET || 'COSMU';

const JWT_CONFIG:jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const createToken = (data:string) => jwt.sign({ data }, SECRETE, JWT_CONFIG);

const verifyToken = (token:string) => jwt.verify(token, SECRETE);
const authFunctions = { createToken, verifyToken };

export default authFunctions;
