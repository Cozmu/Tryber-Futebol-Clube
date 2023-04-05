import { Router } from 'express';
import TeamsValidation from '../validations/TeamsValidation';
import TeamsModel from '../database/models/Teams.model';
import TeamsService from '../services/Teams.service';
import TeamsController from '../controllers/Teams.controller';

const router = Router();

const teamsValidation = new TeamsValidation();
const teamsSerivce = new TeamsService(TeamsModel, teamsValidation);
const teamsController = new TeamsController(teamsSerivce);

router.get('/', teamsController.listAll.bind(teamsController));
router.get('/:id', teamsController.listById.bind(teamsController));

export default router;
