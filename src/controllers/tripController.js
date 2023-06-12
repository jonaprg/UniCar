import tripServices from '../services/tripServices.js'

const getTripsBySearch = async (req, res) => {
  try {
    const { origin, destination, seats, dateTime } = req.body
    if (!origin || !destination || !seats || !dateTime) {
      res.status(400).send('Bad request, not all fields are provided')
      return
    }

    const params = {
      origin,
      destination,
      seats,
      dateTime: dateTime.split('T')[0]
    }

    const trips = await tripServices.getTripsBySearch(params)
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
      carColor: req.body.carColor ?? '',
      preferences: req.body.preferences ?? []

    }

    const response = await tripServices.createNewTrip(tripData, userDriverId)
    res.status(response.status).send(response)
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
    res.status(response.status).send(response)
  } catch {
    res.status(400).send('Error delete trip')
  }
}

const deletePassengerFromTrip = async (req, res) => {
  try {
    const { tripId } = req.params
    const userId = req.uid
    const response = await tripServices.deletePassengerFromTrip(tripId, userId)
    res.status(response.status).send(response)
  } catch {
    res.status(400).send('Error delete passenger of trip')
  }
}

const requestPassengerToTrip = async (req, res) => {
  try {
    const { tripId } = req.params
    const userId = req.uid
    const response = await tripServices.requestPassengerToTrip(tripId, userId)
    console.log(response)
    res.status(response.status).send(response)
  } catch {
    res.status(400).send('Error add request passenger of trip')
  }
}

const acceptPassengerToTrip = async (req, res) => {
  try {
    const { tripId, passengerId } = req.params
    const driverId = req.uid
    const response = await tripServices.acceptPassengerToTrip(tripId, passengerId, driverId)
    res.send(response)
  } catch {
    res.status(400).send('Error add passenger to trip')
  }
}

const notAcceptedPassengerFromTrip = async (req, res) => {
  try {
    const { tripId, passengerId } = req.params
    const driverId = req.uid
    const response = await tripServices.notAcceptedPassengerFromTrip(tripId, passengerId, driverId)
    res.status(response.status).send(response)
  } catch {
    res.status(400).send('Error to not accept passenger to trip')
  }
}

export default {
  notAcceptedPassengerFromTrip,
  acceptPassengerToTrip,
  requestPassengerToTrip,
  getTripsBySearch,
  getTripsByUser,
  getTripById,
  createNewTrip,
  updateTrip,
  deteleTripByDriver,
  deletePassengerFromTrip
}
