import { Router } from 'express';
import { PROFILE_ROUTS } from '../utils/consts';
import authMiddleware from '../authMiddleware';
import ProfileController from '../controllers/profile';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.get(PROFILE_ROUTS.info, authMiddleware, profileController.info);
profileRouter.get(PROFILE_ROUTS.posts, authMiddleware, profileController.posts);
profileRouter.post(PROFILE_ROUTS.addPost, authMiddleware, profileController.addPost);

export default profileRouter;