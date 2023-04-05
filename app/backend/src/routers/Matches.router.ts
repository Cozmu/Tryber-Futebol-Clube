import { Router } from 'express';
import TeamsValidation from '../validations/TeamsValidation';
import TeamsModel from '../database/models/Teams.model';
import MatchesValidate from '../validations/MatchesValidation';
import validateRequiredFields from '../middlewares/validateRequiredFields';
import validateToken from '../middlewares/validateToken';
import MatchesController from '../controllers/Matches.controller';
import MatchesModel from '../database/models/Matchers.model';
import MatchesService from '../services/Matches.service';
import TeamsService from '../services/Teams.service';

const router = Router();

const teamsValidation = new TeamsValidation();
const teamsService = new TeamsService(TeamsModel, teamsValidation);
const matchesValidation = new MatchesValidate();
const matchesService = new MatchesService(MatchesModel, matchesValidation, teamsService);
const matchesController = new MatchesController(matchesService);

router.get('/', matchesController.listAll.bind(matchesController));
router.patch(
  '/:id',
  validateToken,
  validateRequiredFields('scoreboard'),
  matchesController.updateMatchesScore.bind(matchesController),
);
router.patch(
  '/:id/finish',
  validateToken,
  matchesController.updateMatchesProgression.bind(matchesController),
);
router.post(
  '/',
  validateToken,
  validateRequiredFields('newMatch'),
  matchesController.insertNewMatcher.bind(matchesController),
);

export default router;
