import { Request, Response } from 'express';

interface ITeamsController {
  listAll(req:Request, res:Response): Promise<Response>
}

export default ITeamsController;
