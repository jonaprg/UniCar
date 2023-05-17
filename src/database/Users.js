import db from './dbAuth.js'

const createNewUser = async (data, id) => {
  const newUser = await db.collection('users').doc(id)
  await newUser.set(data)
}

const getUserById = async (id) => {
  const userDoc = await db.collection('users').doc(id).get()
  if (!userDoc.exists) {
    throw new Error('User not found')
  }
  return userDoc.data()
}

const updateUserById = async (data, id) => {
  try {
    await db.collection('users').doc(id)
      .update(data)
  } catch (error) {
    console.log(error)
  }
}

const deleteUserById = async (id) => {
  await db.collection('users').doc(id).delete()
}

export default {
  createNewUser,
  getUserById,
  updateUserById,
  deleteUserById
}
