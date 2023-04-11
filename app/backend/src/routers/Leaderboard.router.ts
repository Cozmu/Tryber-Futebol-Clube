import { Router } from 'express';
// import LeadboardModel from '../database/models/LeadboardModel';
// import TeamsModel from '../database/models/Teams.model';
import MatchesModel from '../database/models/Matchers.model';
import LeadboardService from '../services/Leadboard.service';
import LeadboardController from '../controllers/Leadboard.controller';

const router = Router();

// const leadboardModel = new LeadboardModel();
const leadboardService = new LeadboardService(MatchesModel);
const leadboardController = new LeadboardController(leadboardService);

router.get('/home', leadboardController.listHomeLeadboard.bind(leadboardController));

export default router;
