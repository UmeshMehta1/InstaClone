import express from 'express'
import { editProfile, followOrUnfollow, getProfile, getSuggestedUsers, Login, logout, register } from "../controllers/userController.js";
import isAuthenticated from '../middleware/isAuthenticated.js';
import upload from '../middleware/multer.js';


const router= express.Router();

router.route('/register').post(register)
router.route('/login').post(Login)
router.route('/logout').get(logout)
router.route('/:id/profile').get(isAuthenticated,getProfile)
router.route('/profile/edit').post(isAuthenticated,upload.single('profilePhoto'),editProfile);
router.route('/suggested').get(isAuthenticated, getSuggestedUsers)
router.route('/followorunfollow/:id').post(isAuthenticated,followOrUnfollow);


export default router