import express from 'express'
import userController from '../controllers/userController.js'
const router = express.Router()

router
  .get('/', userController.getAllUsers)
  .get('/:userId', userController.getUserById)
  .post('/:userId', userController.createNewUser)
  .patch('/:userId', userController.updateUserById)
  .delete('/:userId', userController.deleteUserById)

export default router
