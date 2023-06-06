import express from 'express'
import tripController from '../controllers/tripController.js'
import authMiddleware from '../middleware/Auth.js'
const router = express.Router()

router
  .get('/user', authMiddleware, tripController.getTripsByUser)
  .get('/:id', authMiddleware, tripController.getTripById)
  .post('/trip', authMiddleware, tripController.createNewTrip)
  .post('/search', authMiddleware, tripController.getTripsBySearch)
  .put('/:tripId/:passengerId/acceptPassenger', authMiddleware, tripController.acceptPassengerToTrip)
  .put('/:tripId/:passengerId/notAccepted', authMiddleware, tripController.notAcceptedPassengerFromTrip)
  .put('/:id', authMiddleware, tripController.updateTrip)
  .put('/:tripId/request', authMiddleware, tripController.requestPassengerToTrip)
  .put('/:tripId/passenger', authMiddleware, tripController.deletePassengerFromTrip)
  .delete('/:id', authMiddleware, tripController.deteleTripByDriver)
export default router
