import db from './dbAuth.js'

const createNewUser = async (data, id) => {
  const userDoc = await db.collection('users').where('email', '==', data.email).get()
  console.log(userDoc)
  if (!userDoc.empty) {
    return { status: 409, message: 'User already exists' }
  } else {
    const newUser = await db.collection('users').doc(id)
    await newUser.set(data)
    return { status: 201, message: 'Create new user success' }
  }
}

const getUserById = async (id) => {
  const userDoc = await db.collection('users').doc(id).get()
  if (userDoc.empty) {
    return { status: 404, message: 'User not found' }
  }

  const user = userDoc.data()

  const filteredFields = {}

  for (const field in user) {
    if (user[field] !== undefined && user[field] !== null) {
      filteredFields[field] = user[field]
    }
  }

  return filteredFields
}

const updateUserById = async (data, id) => {
  try {
    await db.collection('users').doc(id)
      .update(data)

    if (data.carBrand || data.carColor || data.preferences || data.name) {
      await db.collection('trips')
        .where('userDriver', '==', id)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const trip = doc.data()
            if (data.carBrand) {
              trip.carBrand = data.carBrand
            }
            if (data.carColor) {
              trip.carColor = data.carColor
            }
            if (data.preferences) {
              trip.preferences = data.preferences
            }
            if (data.name) {
              trip.userDriverName = data.name
            }
            db.collection('trips').doc(doc.id).update(trip)
          })
        })
        .catch(err => console.log(err))
    }

    return { status: 200, message: 'Update user success' }
  } catch (error) {
    console.log(error)
    return { status: 500, message: 'Update user failed' }
  }
}

const deleteUserById = async (id) => {
  const userDoc = await db.collection('users').doc(id).get()
  if (!userDoc.empty) {
    return { status: 404, message: 'User not found' }
  } else {
    await db.collection('users').doc(id).delete()
    return { status: 200, message: 'Delete user success' }
  }
}

export default {
  createNewUser,
  getUserById,
  updateUserById,
  deleteUserById
}
