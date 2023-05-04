import db from './dbAuth.js'

const getAllUsers = async () => {
  const dataUsers = []
  const snapshotUsers = await db.collection('users').get()
  snapshotUsers.forEach((doc) => { dataUsers.push(doc.data()) })
  return dataUsers
}

const createNewUser = async (data, uid) => {
  const newUser = await db.collection('users').doc(uid)
  await newUser.set(data)
}

export default {
  getAllUsers,
  createNewUser
}
