import { Request, Response } from 'express';
import LeadboardService from '../services/Leadboard.service';
import ILeadboardController from './interfaces/ILeadboard.controller';

class LeadboardController implements ILeadboardController {
  constructor(
    private _leadboardService:LeadboardService,
  ) {}

  async listHomeLeadboard(_req:Request, res:Response):Promise<Response> {
    const result = await this._leadboardService.listHomeLeadboard();
    return res.status(200).json(result);
  }
}

export default LeadboardController;
