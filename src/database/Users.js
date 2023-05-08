import db from './dbAuth.js'

const createNewUser = async (data, uid) => {
  const newUser = await db.collection('users').doc(uid)
  await newUser.set(data)
}

const getUserById = async (id) => {
  const userDoc = await db.collection('users').doc(id).get()
  if (!userDoc.exists) {
    throw new Error('User not found')
  }
  return userDoc.data()
}

const updateUserById = async (data, uid) => {
  const userDoc = await db.collection('users').doc(uid).get()
  if (!userDoc.exists) {
    throw new Error('User not found')
  }
  await userDoc.update(data)
}

const removeUserById = async (uid) => {
  const userDoc = await db.collection('users').doc(uid).get()
  if (!userDoc.exists) {
    throw new Error('User not found')
  }
  await userDoc.delete()
}

export default {
  createNewUser,
  getUserById,
  updateUserById,
  removeUserById
}
