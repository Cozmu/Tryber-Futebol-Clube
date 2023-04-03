import { Request, Response } from 'express';

interface IMatchesController {
  listAll(req:Request, res:Response):Promise<Response>,
  updatePatch(req:Request, res:Response): Promise<Response>
}

export default IMatchesController;
