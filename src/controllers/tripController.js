import tripServices from '../services/tripServices.js'

const getTrips = async (req, res) => {
  try {
    const { origin, destination, date, seatPlaces } = req.query
    const trips = await tripServices.getTrips(origin, destination, date, seatPlaces)
    res.status(200).send(trips)
  } catch {
    res.send('Error Get trips')
  }
}

const getTripById = async (req, res) => {
  try {
    const { tripId } = req.params
    const trip = await tripServices.getTripById(tripId)
    res.status(200).send(trip)
  } catch {
    res.send('Error Get trip by id')
  }
}

const createNewTrip = async (req, res) => {
  try {
    const userDriverId = req.body.uid
    const tripData = {
      origin: req.body.orgin,
      destination: req.body.destination,
      date: req.body.date,
      price: req.body.price,
      seatPlaces: req.body.seatPlaces,
      stopPoints: req.body.stopPoints,
      modelCar: req.body.modelCar
    }

    await tripServices.createNewTrip(tripData, userDriverId)
    res.send({ status: 201, message: 'Create new trip success' })
  } catch (error) {
    console.log(error)
    res.send({ status: 500, message: 'Create new trip failed' })
  }
}
const updateTrip = async (req, res) => {
  try {
    const { tripId } = req.params
    const userId = req.body.uid
    const tripData = {
      origin: req.body.orgin,
      destination: req.body.destination,
      date: req.body.date,
      price: req.body.price,
      seatPlaces: req.body.seatPlaces,
      stopPoints: req.body.stopPoints,
      modelCar: req.body.modelCar
    }
    await tripServices.updateTrip(tripData, tripId, userId)
    res.send('Update trip with')
  } catch {
    res.send('Eror Update trip')
  }
}
const deteleTripByDriver = async (req, res) => {
  try {
    const { tripId } = req.params
    const userId = req.body.uid
    await tripServices.deteleTripByDriver(tripId, userId)
    res.send('Update trip')
  } catch {
    res.send('Error Update trip')
  }
}

const deletePassangerFromTrip = async (req, res) => {
  try {
    const { tripId } = req.params
    const userId = req.body.uid
    await tripServices.deletePassangerFromTrip(tripId, userId)
    res.send('Update trip')
  } catch {
    res.send('Error Update trip')
  }
}

export default {
  getTrips,
  getTripById,
  createNewTrip,
  updateTrip,
  deteleTripByDriver,
  deletePassangerFromTrip
}
