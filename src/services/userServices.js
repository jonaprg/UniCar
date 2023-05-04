import Users from '../database/Users.js'

const getAllUsers = async () => {
  const allUsers = await Users.getAllUsers()
  return allUsers
}
const getUserById = () => { }

const createNewUser = async (data, uid) => {
  await Users.createNewUser(data, uid)
}
const updateUserById = () => { }
const deleteUserById = () => { }

export default {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById
}
