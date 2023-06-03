import express from 'express'
import tripController from '../controllers/tripController.js'
import authMiddleware from '../middleware/Auth.js'
const router = express.Router()

router
  .get('/search/:origen/:destination/:seats/:date:', authMiddleware, tripController.getTripsByParams)
  .get('/user', authMiddleware, tripController.getTripsByUser)
  .get('/:id', authMiddleware, tripController.getTripById)
  .post('/trip', authMiddleware, tripController.createNewTrip)
  .put('/:id', authMiddleware, tripController.updateTrip)
  .put('/:tripId/passenger', authMiddleware, tripController.deletePassengerFromTrip)
  .delete('/:id', authMiddleware, tripController.deteleTripByDriver)

export default router
