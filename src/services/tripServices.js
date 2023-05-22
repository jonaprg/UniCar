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

const getTripsByUser = async (userId) => {
  return await Trips.getTripsByUser(userId)
}

const getTripById = async (id) => {
  return await Trips.getTripById(id)
}

const createNewTrip = async (data, userDriverId) => {
  try {
    const exists = await checkExistingTrip(data.origin, data.destination, data.date, userDriverId)

    if (exists) {
      console.log('eNTRO AQUI EXISTE')
      return JSON.stringify({ status: 409, message: 'Ya existe un viaje con los mismos datos' })
    } else {
      console.log('NO EXISTE')
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
  await Trips.deteleTripByDriver(tripId, userId)
}

const deletePassangerFromTrip = async (tripId, userId) => {
  await Trips.deletePassangerFromTrip(tripId, userId)
}

export default {
  getTripsByUser,
  getTripById,
  createNewTrip,
  updateTrip,
  deteleTripByDriver,
  deletePassangerFromTrip
}
