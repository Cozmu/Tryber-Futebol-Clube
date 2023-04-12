import { Router } from 'express';
import LeadboardModel from '../database/models/LeadboardModel';
import TeamsModel from '../database/models/Teams.model';
import MatchesModel from '../database/models/Matchers.model';
import LeadboardService from '../services/LeadBoard.service';
import LeadboardController from '../controllers/Leadboard.controller';

const router = Router();

const leadboardModel = new LeadboardModel(MatchesModel, TeamsModel);
const leadboardService = new LeadboardService(leadboardModel);
const leadboardController = new LeadboardController(leadboardService);

router.get('/', leadboardController.listLeadboard.bind(leadboardController));
router.get('/home', leadboardController.listHomeLeadboard.bind(leadboardController));
router.get('/away', leadboardController.listAwayLeadboard.bind(leadboardController));

export default router;
