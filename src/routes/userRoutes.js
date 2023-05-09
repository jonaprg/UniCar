import express from 'express'
import userController from '../controllers/userController.js'
import authMiddleware from '../middleware/Auth.js'
const router = express.Router()

router
  .get('/:id', authMiddleware, userController.getUserById)
  .post('/user', authMiddleware, userController.createNewUser)
  .patch('/:id', authMiddleware, userController.updateUserById)
  .delete('/:id', authMiddleware, userController.deleteUserById)

export default router
