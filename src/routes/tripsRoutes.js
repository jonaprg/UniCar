import express from 'express'
import tripController from '../controllers/tripController.js'
import authMiddleware from '../middleware/Auth.js'
const router = express.Router()

router
  .get('/user/:id', authMiddleware, tripController.getTripsByUser)
  .get('/:id', authMiddleware, tripController.getTripById)
  .post('/trip/:id', authMiddleware, tripController.createNewTrip)
  .put('/:id', authMiddleware, tripController.updateTrip)
  .put('/passenger/:id', authMiddleware, tripController.deletePassengerFromTrip)
  .delete('/:id', authMiddleware, tripController.deteleTripByDriver)

export default router
