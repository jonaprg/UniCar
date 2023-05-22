import tripServices from '../services/tripServices.js'

const getTripsByUser = async (req, res) => {
  try {
    const { id } = req.params
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
    const userDriverId = req.body.userDriverId
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
    const userId = req.body.uid
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
  getTripsByUser,
  getTripById,
  createNewTrip,
  updateTrip,
  deteleTripByDriver,
  deletePassangerFromTrip
}
