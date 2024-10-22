/**
 * Specifies the middleware and controller functions to call for each route
 * relating to admin users.
 */
import express from 'express';
import {
  getAllUsers,
  addNewUser,
  deleteUser
} from '../controllers/toxic.controller';
import 'dotenv/config';

const router = express.Router();

/**
 * A GET route to get all users. Checks first if the requestor is a
 * authenticated and is an admin.
 */
router.get('/all', getAllUsers);

router.put('/add', addNewUser);

router.delete('/delete', deleteUser)

export default router;
