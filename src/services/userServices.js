import Users from '../database/Users.js'

const getUserById = async (id) => {
  return await Users.getUserById(id)
}

const createNewUser = async (data, uid) => {
  await Users.createNewUser(data, uid)
}

const updateUserById = async (data, uid) => {
  await Users.updateUserById(data, uid)
}

const deleteUserById = async (id) => {
  await Users.deleteUserById(id)
}

export default {
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById
}
