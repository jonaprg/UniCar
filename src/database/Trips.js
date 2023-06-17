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
        trips.push(doc.data())
      })
    })
    .catch(err => {
      console.log('Error getting documents', err)
    })
  return trips
}

const getTripsByUser = async (userId) => {
  const data = []

  await db.collection('trips')
    .where('userDriver', '==', userId)
    .get()
    .then(async snapshot => {
      snapshot.forEach(doc => {
        data.push(doc.data())
      })
      await db.collection('trips')
        .where('passengers', 'array-contains', userId)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            data.push(doc.data())
          })
        })
    })
    .catch(err => {
      console.log('Error getting documents', err)
    })

  console.log(data)

  return data
}

const createNewTrip = async (data, id) => {
  const newTrip = await db.collection('trips').doc()
  const getUser = await db.collection('users').doc(id).get()
  const getDayMonthYear = data.date.split(' ')[0]
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
    carBrand: getUser.data().carBrand || '',
    carColor: getUser.data().carColor || '',
    preferences: getUser.data().preferences || [],
    passengers: [],
    passengersData: {},
    userDriverName: getUser.data().name
  })
  return { status: 201, message: 'Create new trip success' }
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
    return { status: 404, message: 'Trip not found' }
  }
  await tripDoc.docs[0].ref.delete()

  const passengerRequestDoc = await db.collection('passengerRequest')
    .where('tripId', '==', id)
    .get()
  if (!passengerRequestDoc.empty) {
    passengerRequestDoc.forEach(doc => {
      doc.ref.delete()
    })
  }
  return { status: 200, message: 'Delete trip success' }
}

const deletePassengerFromTrip = async (id, userId) => {
  console.log(id, userId)

  const tripDoc = await db.collection('trips')
    .where('tripId', '==', id)
    .limit(1)
    .get()

  if (tripDoc.empty) {
    return { status: 404, message: 'Trip not found' }
  }
  const tripData = tripDoc.docs[0].data()
  console.log(tripData)

  const passengerIndex = tripData.passengers.findIndex(p => p === userId)
  console.log(passengerIndex)
  if (passengerIndex === -1) {
    return { status: 404, message: 'Not authorized' }
  }

  // Remove the user from the passengers array
  tripData.passengers.splice(passengerIndex, 1)
  // Update the trip document
  await tripDoc.docs[0].ref.update(
    {
      passengers: tripData.passengers,
      passengersData: { ...tripData.passengersData, [userId]: null }
    })

  return { status: 200, message: 'Delete trip success' }
}

const requestPassengerToTrip = async (tripId, userId, seats) => {
  const tripDoc = await db.collection('trips')
    .where('tripId', '==', tripId)
    .limit(1)
    .get()

  if (tripDoc.empty) {
    return { status: 404, message: 'Trip not found' }
  }
  if (tripDoc.docs[0].data().userDriver === userId) {
    return { status: 404, message: 'You are the driver' }
  }

  const tripData = tripDoc.docs[0].data()

  // Check if the user is already in the passengers array
  const passengerIndex = tripData.passengers.findIndex(p => p === userId)
  if (passengerIndex !== -1) {
    return { status: 404, message: 'Already in the trip' }
  }

  // Check if there are seats available
  if (tripData.seatsAvailable < seats) {
    return { status: 404, message: 'No seats available' }
  }
  const existsRequest = await db.collection('passengerRequest')
    .where('tripId', '==', tripId)
    .where('passengerId', '==', userId)
    .limit(1)
    .get()
  if (!existsRequest.empty) {
    return { status: 404, message: 'Request already sent' }
  }

  const uid = short.generate()
  const passengerRequest = await db.collection('passengerRequest').doc(uid)
  await passengerRequest.set({
    uid,
    tripId,
    passengerId: userId,
    status: 'pending',
    timeCreated: new Date(),
    seats
  })

  return { status: 200, message: 'Request sent' }
}

const acceptPassengerToTrip = async (tripId, passengerId, driverId) => {
  const passengerRequest = await db.collection('passengerRequest')
    .where('tripId', '==', tripId)
    .where('passengerId', '==', passengerId)
    .where('status', '==', 'pending')
    .limit(1)
    .get()

  if (passengerRequest.empty) {
    return { status: 404, message: 'Passenger Request not found, or already accepted' }
  }
  const tripDoc = await db.collection('trips')
    .where('tripId', '==', tripId)
    .where('userDriver', '==', driverId)
    .limit(1)
    .get()

  if (tripDoc.empty) {
    return { status: 404, message: 'Trip not found' }
  }

  const tripData = tripDoc.docs[0].data()
  const dataRequest = passengerRequest.docs[0].data()

  if (tripData.seatsAvailable === dataRequest.seats) {
    return { status: 404, message: 'No seats available' }
  }
  const userDoc = await db.collection('users').doc(passengerId).get()
  if (userDoc.empty) {
    return { status: 404, message: 'User not found' }
  }
  console.log(userDoc.data().name)

  await tripDoc.docs[0].ref.update({
    passengers: [...tripData.passengers, passengerId],
    seatsAvailable: tripData.seatsAvailable - dataRequest.seats,
    passengersData: {
      ...tripData.passengersData,
      [passengerId]: { name: userDoc.data().name, id: passengerId }
    }
  })
  const update = await passengerRequest.docs[0].ref.update({ status: 'accepted' })
  if (!update) {
    return { status: 404, message: 'Error accepting passenger' }
  }
  return { status: 200, message: 'Passenger accepted' }
}

const notAcceptedPassengerFromTrip = async (tripId, passengerId, driverId) => {
  const passengerRequest = await db.collection('passengerRequest')
    .where('tripId', '==', tripId)
    .where('passengerId', '==', passengerId)
    .where('status', '==', 'pending')
    .limit(1)
    .get()

  if (passengerRequest.empty) {
    return { status: 404, message: 'Passenger Request not found' }
  }

  const update = await passengerRequest.docs[0].ref.update({ status: 'rejected' })
  if (!update) {
    return { status: 404, message: 'Error rejecting passenger' }
  }

  return { status: 200, message: 'Passenger rejected' }
}

const getTripRequestsById = async (id) => {
  try {
    const querySnapshot = await db.collection('passengerRequest')
      .where('tripId', '==', id)
      .where('status', '==', 'pending')
      .get()

    const data = []
    for (const doc of querySnapshot.docs) {
      const requestData = doc.data()
      try {
        const userDoc = await db.collection('users').doc(requestData.passengerId).get()
        const userData = userDoc.data()
        data.push({ ...requestData, passengerName: userData.name })
      } catch (error) {
        return { status: 404, message: 'User not found' }
      }
    }

    return data
  } catch (error) {
    return { status: 404, message: 'Error getting trip requests' }
  }
}

const getTripById = async (id) => {
  try {
    console.log(id)
    const querySnapshot = await db.collection('trips')
      .where('tripId', '==', id)
      .limit(1)
      .get()
    console.log(querySnapshot)

    if (querySnapshot.empty) {
      return { status: 404, message: 'Trip not found' }
    }

    return { status: 200, message: querySnapshot.docs[0].data() }
  } catch (error) {
    return { status: 404, message: 'Error getting trip' }
  }
}

export default {
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
