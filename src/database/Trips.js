import db from './dbAuth.js'

const getTripsByUser = async (userId) => {
  const trips = await db.collection('trips')
    .where('userDriver', '==', userId)
    .orderBy('dateTime', 'desc')
    .get()
  return trips.docs.map(trip => trip.data())
}

const getTripById = async (id) => {
  const tripDoc = await db.collection('trips').doc(id).get()
  if (!tripDoc.exists) {
    throw new Error('Trip not found')
  }
  return tripDoc.data()
}

const createNewTrip = async (data, id) => {
  const newTrip = await db.collection('trips').doc()
  await newTrip.set({
    userDriver: id,
    origin: data.origin,
    destination: data.destination,
    dateTime: data.date,
    price: data.price,
    seatPlaces: data.seatPlaces,
    seatsAvailable: data.seatsAvailable,
    carBrand: data.carBrand || '',
    carColor: data.carColor || '',
    passangers: []
  })
  return JSON.stringify({ status: 201, message: 'Create new trip success' })
}

const updateTrip = async (tripData, tripId, userDriverId) => {
  const tripDoc = await db.collection('trips').doc(tripId).get()
  if (!tripDoc.exists) {
    throw new Error('Trip not found')
  }
  if (tripDoc.data().userDriver !== userDriverId) {
    throw new Error('You are not authorized to edit this trip')
  }
  await tripDoc.update(tripData)
}

const deteleTripByDriver = async (id, userId) => {
  const tripDoc = await db.collection('trips').doc(id).get()
  if (!tripDoc.exists) {
    throw new Error('Trip not found')
  }
  if (tripDoc.data().userDriver !== userId) {
    throw new Error('You are not authorized to edit this trip')
  }
  await tripDoc.delete()
}

const deteleTripByPassanger = async (id, userId) => {
  const tripDoc = await db.collection('trips').doc(id).get()
  if (!tripDoc.exists) {
    throw new Error('Trip not found')
  }
  const tripData = tripDoc.data()
  const passengerIndex = tripData.passengers.findIndex(p => p.id === userId)
  if (passengerIndex === -1) {
    throw new Error('User is not a passenger in the trip')
  }

  // Remove the user from the passengers array
  tripData.passengers.splice(passengerIndex, 1)

  // Update the trip document
  await tripDoc.update({ passengers: tripData.passengers })
}

export default {
  getTripsByUser,
  getTripById,
  createNewTrip,
  updateTrip,
  deteleTripByDriver,
  deteleTripByPassanger
}
