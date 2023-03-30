import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import UserValidation from '../validations/validationUser';
import UserModel from '../database/models/Users.model';
import UserService from '../services/User.service';
import UserController from '../controllers/User.controller';
import validateRequiredFields from '../middlewares/validateRequiredFields';

const router = Router();

const userValidation = new UserValidation();
const userService = new UserService(userValidation, UserModel);
const userController = new UserController(userService);

router.get('/role', validateToken, userController.getRoleUser.bind(userController));
router.post('/', validateRequiredFields('user'), userController.register.bind(userController));

export default router;
