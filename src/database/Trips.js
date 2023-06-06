import db from './dbAuth.js'
import short from 'short-uuid'

const getTripsBySearch = async (params) => {
  const trips = []
  console.log(params)
  await db.collection('trips')
    .where('origin', '==', params.origin)
    .where('destination', '==', params.destination)
    .where('dayMonthYear', '==', params.dateTime)
    .where('seatsAvailable', '>=', params.seats)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.data())
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

const requestPassengerToTrip = async (tripId, userId) => {
  const tripDoc = await db.collection('trips')
    .where('tripId', '==', tripId)
    .limit(1)
    .get()

  if (tripDoc.empty) {
    return JSON.stringify({ status: 404, message: 'Trip not found' })
  }
  if (tripDoc.docs[0].data().userDriver === userId) {
    return JSON.stringify({ status: 404, message: 'You are the driver' })
  }

  const tripData = tripDoc.docs[0].data()
  console.log(tripData)

  // Check if the user is already in the passengers array
  const passengerIndex = tripData.passengers.findIndex(p => p === userId)
  if (passengerIndex !== -1) {
    return JSON.stringify({ status: 404, message: 'Already in the trip' })
  }

  // Check if there are seats available
  if (tripData.seatsAvailable === 0) {
    return JSON.stringify({ status: 404, message: 'No seats available' })
  }
  const existsRequest = await db.collection('passengerRequest')
    .where('tripId', '==', tripId)
    .where('passengerId', '==', userId)
    .limit(1)
    .get()
  if (!existsRequest.empty) {
    return JSON.stringify({ status: 404, message: 'Request already sent' })
  }

  const uid = short.generate()
  const passengerRequest = await db.collection('passengerRequest').doc(uid)
  await passengerRequest.set({
    uid,
    tripId,
    passengerId: userId,
    status: 'pending'
  })

  return JSON.stringify({ status: 200, message: 'Request sent' })
}

const acceptPassengerToTrip = async (tripId, passengerId, driverId) => {
  const passengerRequest = await db.collection('passengerRequest')
    .where('tripId', '==', tripId)
    .where('passengerId', '==', passengerId)
    .where('status', '==', 'pending')
    .limit(1)
    .get()

  if (passengerRequest.empty) {
    return JSON.stringify({ status: 404, message: 'Passenger Request not found' })
  }

  const update = await passengerRequest.docs[0].ref.update({ status: 'accepted' })
  if (!update) {
    return JSON.stringify({ status: 404, message: 'Error accepting passenger' })
  }
  const tripDoc = await db.collection('trips')
    .where('tripId', '==', tripId)
    .where('userDriver', '==', driverId)
    .limit(1)
    .get()

  if (tripDoc.empty) {
    return JSON.stringify({ status: 404, message: 'Trip not found' })
  }

  const tripData = tripDoc.docs[0].data()
  await tripDoc.docs[0].ref.update({ passengers: [...tripData.passengers, passengerId], seatsAvailable: tripData.seatsAvailable - 1 })
  return JSON.stringify({ status: 200, message: 'Passenger accepted' })
}

const notAcceptedPassengerFromTrip = async (tripId, passengerId, driverId) => {
  const passengerRequest = await db.collection('passengerRequest')
    .where('tripId', '==', tripId)
    .where('passengerId', '==', passengerId)
    .where('status', '==', 'pending')
    .limit(1)
    .get()

  if (passengerRequest.empty) {
    return JSON.stringify({ status: 404, message: 'Passenger Request not found' })
  }

  const update = await passengerRequest.docs[0].ref.update({ status: 'rejected' })
  if (!update) {
    return JSON.stringify({ status: 404, message: 'Error rejecting passenger' })
  }

  return JSON.stringify({ status: 200, message: 'Passenger rejected' })
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
