import express from 'express';
import {
  saveUser,
  getOneUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getByRole
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', saveUser);
router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/role/:role', getByRole);

export default router;