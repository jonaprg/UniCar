import express from 'express'
import chatController from '../controllers/chatController.js'
import authMiddleware from '../middleware/Auth.js'
const router = express.Router()

router
  .post('/room', authMiddleware, chatController.createChatRoom)
  .delete('/:roomId', authMiddleware, chatController.deleteRoomChatById)

// .get('/user/:id', authMiddleware, chatController.getListsChatsByUser)

export default router
