import express from 'express'
import ratingController from '../controllers/userController.js'
import authMiddleware from '../middleware/Auth.js'
const router = express.Router()

router
  .get('/user', authMiddleware, ratingController.getUserById)
  .put('/user/', authMiddleware, ratingController.updateUserById)
  .delete('/:id', authMiddleware, ratingController.deleteUserById)

export default router
