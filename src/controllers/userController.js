import userServices from '../services/userServices.js'

const getAllUsers = (req, res) => {
  const users = userServices.getAllUsers()
  res.send('Get all users!')
}
const getUserById = (req, res) => {
  const user = userServices.getUserById(req.params.userId)
  res.send(`Get user with id: ${req.params.userId}`)
}
const createNewUser = (req, res) => {
  const createdUser = userServices.createNewUser(req.body)
  res.send(`Create user with id: ${req.params.userId}`)
}
const updateUserById = (req, res) => {
  const updatedUser = userServices.updateUserById(req.params.userId, req.body)
  res.send(`Update user with id: ${req.params.userId}`)
}
const deleteUserById = (req, res) => {
  const deletedUser = userServices.deleteUserById(req.params.userId)
  res.send(`Delete user with id: ${req.params.userId}`)
}

export default {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById
}
