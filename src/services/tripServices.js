import Trips from '../database/Trips.js'

const getTrips = async (origin, destination, date, seatPlaces) => {
  return await Trips.getTrips(origin, destination, date, seatPlaces)
}

const getTripById = async (id) => {
  return await Trips.getTripById(id)
}

const createNewTrip = async (data, userDriverId) => {
  await Trips.createNewTrip(data, userDriverId)
}

const updateTrip = async (data, tripId, userDriverId) => {
  await Trips.updateTrip(data, tripId, userDriverId)
}

const deteleTripByDriver = async (tripId, userId) => {
  await Trips.deteleTripByDriver(tripId, userId)
}

const deletePassangerFromTrip = async (tripId, userId) => {
  await Trips.deletePassangerFromTrip(tripId, userId)
}

export default {
  getTrips,
  getTripById,
  createNewTrip,
  updateTrip,
  deteleTripByDriver,
  deletePassangerFromTrip
}
