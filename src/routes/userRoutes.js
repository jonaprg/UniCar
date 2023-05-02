import express from 'express'
import userController from '../controllers/userController.js'
import authMiddleware from '../middleware/Auth.js'
const router = express.Router()

router
  .get('/users', authMiddleware, userController.getAllUsers)
  .get('/:userId', authMiddleware, userController.getUserById)
  .post('/user', authMiddleware, userController.createNewUser)
  .patch('/:userId', authMiddleware, userController.updateUserById)
  .delete('/:userId', authMiddleware, userController.deleteUserById)

export default router
