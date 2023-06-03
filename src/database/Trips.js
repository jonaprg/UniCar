import db from './dbAuth.js'
import short from 'short-uuid'

const getTripsByParams = async (params) => {
  const trips = []
  await db.collection('trips')
    .where('origin', '==', params.origin)
    .where('destination', '==', params.destination)
    .where('dayMonthYear', '==', params.dateTime)
    .where('seatsAvailable', '>=', params.seats)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        trips.push(doc.data())
      })
    })
    .catch(err => {
      console.log('Error getting documents', err)
    })
  return trips
}

const getTripsByUser = async (userId) => {
  const docs = []

  await db.collection('trips')
    .where('userDriver', '==', userId)
    .get()
    .then(async snapshot => {
      snapshot.forEach(doc => {
        docs.push(doc.data())
      })
      await db.collection('trips')
        .where('passengers', 'array-contains', userId)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            docs.push(doc.data())
          })
        })
    })
    .catch(err => {
      console.log('Error getting documents', err)
    })
  console.log(docs)

  return docs
}

const getTripById = async (id) => {
  const tripDoc = await db.collection('trips').doc(id).get()
  if (!tripDoc.empty) {
    throw new Error('Trip not found')
  }
  return tripDoc.data()
}

const createNewTrip = async (data, id) => {
  const newTrip = await db.collection('trips').doc()
  const getDayMonthYear = data.date.split('T')[0]
  await newTrip.set({
    tripId: short.generate(),
    userDriver: id,
    origin: data.origin,
    destination: data.destination,
    dateTime: data.date,
    dayMonthYear: getDayMonthYear,
    price: data.price,
    seatPlaces: data.seatPlaces,
    seatsAvailable: data.seatsAvailable,
    carBrand: data.carBrand || '',
    carColor: data.carColor || '',
    passengers: []
  })
  return JSON.stringify({ status: 201, message: 'Create new trip success' })
}

const updateTrip = async (tripData, tripId, userDriverId) => {
  const tripDoc = await db.collection('trips').doc(tripId).get()
  if (!tripDoc.empty) {
    throw new Error('Trip not found')
  }
  if (tripDoc.data().userDriver !== userDriverId) {
    throw new Error('You are not authorized to edit this trip')
  }
  await tripDoc.update(tripData)
}

const deteleTripByDriver = async (id, userId) => {
  const tripDoc = await db.collection('trips')
    .where('tripId', '==', id)
    .where('userDriver', '==', userId)
    .limit(1)
    .get()

  console.log(tripDoc.docs[0])
  console.log(id, userId)
  if (tripDoc.empty) {
    return JSON.stringify({ status: 404, message: 'Trip not found' })
  }
  await tripDoc.docs[0].ref.delete()
  return JSON.stringify({ status: 200, message: 'Delete trip success' })
}

const deletePassengerFromTrip = async (id, userId) => {
  console.log(id, userId)

  const tripDoc = await db.collection('trips')
    .where('tripId', '==', id)
    .limit(1)
    .get()

  if (tripDoc.empty) {
    return JSON.stringify({ status: 404, message: 'Trip not found' })
  }
  const tripData = tripDoc.docs[0].data()
  console.log(tripData)

  const passengerIndex = tripData.passengers.findIndex(p => p === userId)
  console.log(passengerIndex)
  if (passengerIndex === -1) {
    return JSON.stringify({ status: 404, message: 'Not authorized' })
  }

  // Remove the user from the passengers array
  tripData.passengers.splice(passengerIndex, 1)
  console.log(tripData.passengers)
  // Update the trip document
  await tripDoc.docs[0].ref.update({ passengers: tripData.passengers })
  return JSON.stringify({ status: 200, message: 'Delete trip success' })
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
