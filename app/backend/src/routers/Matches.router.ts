import { Router } from 'express';
import MatchesValidate from '../validations/MatchesValidation';
import validateRequiredFields from '../middlewares/validateRequiredFields';
import validateToken from '../middlewares/validateToken';
import MatchesController from '../controllers/Matches.controller';
import MatchesModel from '../database/models/Matchers.model';
import MatchesService from '../services/Matches.service';

const router = Router();

const matchesValidation = new MatchesValidate();
const matchesService = new MatchesService(MatchesModel, matchesValidation);
const matchesController = new MatchesController(matchesService);

router.get('/', matchesController.listAll.bind(matchesController));
router.patch(
  '/:id',
  validateToken,
  validateRequiredFields('scoreboard'),
  matchesController.updateMatchScore.bind(matchesController),
);
router.patch(
  '/:id/finish',
  validateToken,
  matchesController.updateMatchProgression.bind(matchesController),
);

export default router;
