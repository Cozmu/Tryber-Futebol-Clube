import { NextFunction, Request, Response } from 'express';
import ILeadboard from './interfaces/ILeadboard.controller';

class Leadboard implements ILeadboard {
  async listLeadboard(req:Request, res:Response):Promise<Response> => {

  }
}

export default Leadboard;
