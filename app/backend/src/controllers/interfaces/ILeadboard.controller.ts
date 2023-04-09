import { Request, Response } from 'express';

interface ILeadboardController {
  listHomeLeadboard(req:Request, res:Response):Promise<Response>
}

export default ILeadboardController;
