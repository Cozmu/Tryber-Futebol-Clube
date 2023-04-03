import { Request, Response } from 'express';

interface IMatcherController {
  listAll(req:Request, res:Response):Promise<Response>
}

export default IMatcherController;
