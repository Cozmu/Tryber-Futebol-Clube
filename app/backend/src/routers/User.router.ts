import { Router } from 'express';
import validateRequiredFields from '../middlewares/validateRequiredFields';

const router = Router();

router.post('/', validateRequiredFields('user'));

export default router;
