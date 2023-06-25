import Trips from '../database/Trips.js'
import db from '../database/dbAuth.js'

const checkExistingTrip = async (origin, destination, date, userDriverId) => {
  try {
    // Realizar la consulta en la colección "trips" con los filtros necesarios
    const snapshot = await db
      .collection('trips')
      .where('origin', '==', origin)
      .where('destination', '==', destination)
      .where('dateTime', '==', date)
      .where('userDriver', '==', userDriverId)
      .get()

    // Si existen documentos que coinciden con los filtros, se encontró un viaje existente
    if (!snapshot.empty) {
      console.log('Entro aqui, hay un viaje existente')
      return true
    }

    // No se encontró un viaje existente con los mismos datos
    console.log('No se encontró un viaje existente con los mismos datos')
    return false
  } catch (error) {
    console.log('Error al comprobar el viaje existente:', error)
    throw error
  }
}

const getTripsBySearch = async (params) => {
  return await Trips.getTripsBySearch(params)
}

const getTripsByUser = async (userId) => {
  return await Trips.getTripsByUser(userId)
}

const getTripRequestsById = async (id) => {
  return await Trips.getTripRequestsById(id)
}

const createNewTrip = async (data, userDriverId) => {
  try {
    const exists = await checkExistingTrip(data.origin, data.destination, data.date, userDriverId)

    if (exists) {
      return JSON.stringify({ status: 409, message: 'Ya existe un viaje con los mismos datos' })
    } else {
      return await Trips.createNewTrip(data, userDriverId)
    }
  } catch (error) {
    console.log('Error al crear un nuevo viaje:', error)
    throw error
  }
}

const updateTrip = async (data, tripId, userDriverId) => {
  await Trips.updateTrip(data, tripId, userDriverId)
}

const deteleTripByDriver = async (tripId, userId) => {
  return await Trips.deteleTripByDriver(tripId, userId)
}

const deletePassengerFromTrip = async (tripId, userId) => {
  return await Trips.deletePassengerFromTrip(tripId, userId)
}

const requestPassengerToTrip = async (tripId, userId, seats) => {
  return await Trips.requestPassengerToTrip(tripId, userId, seats)
}

const acceptPassengerToTrip = async (tripId, passengerId, driverId) => {
  return await Trips.acceptPassengerToTrip(tripId, passengerId, driverId)
}
const notAcceptedPassengerFromTrip = async (tripId, userId) => {
  return await Trips.notAcceptedPassengerFromTrip(tripId, userId)
}

const getTripById = async (tripId) => {
  return await Trips.getTripById(tripId)
}

export default {
  checkExistingTrip,
  getTripById,
  notAcceptedPassengerFromTrip,
  acceptPassengerToTrip,
  requestPassengerToTrip,
  getTripsBySearch,
  getTripsByUser,
  getTripRequestsById,
  createNewTrip,
  updateTrip,
  deteleTripByDriver,
  deletePassengerFromTrip
}
