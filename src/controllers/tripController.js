import tripServices from '../services/tripServices.js'

const getTripsByParams = async (req, res) => {
  try {
    const { origin, destination, dateT, seats } = req.query
    const trips = await tripServices.getTripsByParams({ origin, destination, dateT, seats })
    res.status(200).send(trips)
  } catch {
    res.status(404).send('Error Get trips')
  }
}

const getTripsByUser = async (req, res) => {
  try {
    const id = req.uid
    const trips = await tripServices.getTripsByUser(id)
    res.status(200).send(trips)
  } catch {
    res.status(404).send('Error Get trips')
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
    if (!req.uid) {
      res.send({ status: 400, message: 'Bad request, user driver not provided' })
      return
    }
    if (!req.body.origin || !req.body.destination || !req.body.dateTime || !req.body.price || !req.body.seats) {
      res.send({ status: 400, message: 'Bad request, not all fields are provided' })
      return
    }
    const userDriverId = req.uid
    const tripData = {
      origin: req.body.origin,
      destination: req.body.destination,
      date: req.body.dateTime,
      price: req.body.price,
      seatPlaces: req.body.seats,
      seatsAvailable: req.body.seats,
      carBrand: req.body.carBrand ?? '',
      carColor: req.body.carColor ?? ''

    }

    const stat = await tripServices.createNewTrip(tripData, userDriverId)
    console.log(stat)
    res.send(stat)
  } catch (error) {
    console.log(error)
    res.send({ status: 400, message: 'Bad request ' })
  }
}

const updateTrip = async (req, res) => {
  try {
    const { tripId } = req.params
    const userId = req.uid
    const tripData = {
      origin: req.body.origin,
      destination: req.body.destination,
      date: req.body.dateTime,
      price: req.body.price,
      seatPlaces: req.body.seats,
      seatsAvailable: req.body.seats,
      carBrand: req.body.carBrand ?? '',
      carColor: req.body.carColor ?? ''
    }
    await tripServices.updateTrip(tripData, tripId, userId)
    res.send('Update trip with')
  } catch {
    res.send('Eror Update trip')
  }
}
const deteleTripByDriver = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.uid
    const response = await tripServices.deteleTripByDriver(id, userId)
    res.send(response)
  } catch {
    res.status(400).send('Error delete trip')
  }
}

const deletePassengerFromTrip = async (req, res) => {
  try {
    const { tripId } = req.params
    const userId = req.uid
    const response = await tripServices.deletePassengerFromTrip(tripId, userId)
    res.send(response)
  } catch {
    res.status(400).send('Error delete passenger of trip')
  }
}

export default {
  getTripsByParams,
  getTripsByUser,
  getTripById,
  createNewTrip,
  updateTrip,
  deteleTripByDriver,
  deletePassengerFromTrip
}
