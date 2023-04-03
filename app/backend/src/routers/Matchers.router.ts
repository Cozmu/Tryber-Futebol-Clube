import { Router } from 'express';
import MatcherController from '../controllers/Matchers.controller';
import MatcherModel from '../database/models/Matchers.model';
import MatcherService from '../services/Matchers.service';

const router = Router();

const matcherService = new MatcherService(MatcherModel);
const matcherController = new MatcherController(matcherService);

router.get('/', matcherController.listAll.bind(matcherController));

export default router;
