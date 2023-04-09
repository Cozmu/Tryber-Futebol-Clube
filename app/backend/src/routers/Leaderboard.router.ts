import { Router } from 'express';
import TeamsModel from '../database/models/Teams.model';
import MatchesModel from '../database/models/Matchers.model';
import LeadboardService from '../services/Leadboard.service';
import LeadboardController from '../controllers/Leadboard.controller';

const router = Router();

const leadboardService = new LeadboardService(MatchesModel, TeamsModel);
const leadboardController = new LeadboardController(leadboardService);

router.get('/home', leadboardController.listHomeLeadboard.bind(leadboardController));

export default router;
