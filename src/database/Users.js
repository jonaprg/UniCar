import db from './db_auth.js'

const getAllUsers = async () => {
  const dataUsers = []
  const snapshotUsers = await db.collection('users').get()
  snapshotUsers.forEach((doc) => { dataUsers.push(doc.data()) })
  return dataUsers
}

export default {
  getAllUsers
}
