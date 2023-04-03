import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import MatchesController from '../controllers/Matches.controller';
import MatchesModel from '../database/models/Matchers.model';
import MatchesService from '../services/Matches.service';

const router = Router();

const matchesService = new MatchesService(MatchesModel);
const matchesController = new MatchesController(matchesService);

router.get('/', matchesController.listAll.bind(matchesController));
router.patch(
  '/:id/finish',
  validateToken,
  matchesController.updatePatch.bind(matchesController),
);

export default router;
