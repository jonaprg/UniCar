import express from 'express'
import tripController from '../controllers/tripController.js'
import authMiddleware from '../middleware/Auth.js'
const router = express.Router()

router
  .get('/', authMiddleware, tripController.getTrips)
  .get('/:id', authMiddleware, tripController.getTripById)
  .post('/', authMiddleware, tripController.createNewTrip)
  .patch('/:id', authMiddleware, tripController.updateTrip)
  .patch('/:id/passanger', authMiddleware, tripController.deletePassangerFromTrip)
  .delete('/:id', authMiddleware, tripController.deteleTripByDriver)

export default router
