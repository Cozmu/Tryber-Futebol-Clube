import { Router } from 'express';
import TeamsModel from '../database/models/Teams.model';
import TeamsService from '../services/Teams.service';
import TeamsController from '../controllers/Teams.controller';

const router = Router();

const teamsSerivce = new TeamsService(TeamsModel);
const teamsController = new TeamsController(teamsSerivce);

router.get('/', teamsController.listAll.bind(teamsController));

export default router;
