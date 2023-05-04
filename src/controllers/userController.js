import userServices from '../services/userServices.js'

const getAllUsers = async (req, res) => {
  const users = await userServices.getAllUsers()
  res.send({ status: 200, data: users, message: 'Get all users success' })
}
const getUserById = (req, res) => {
  // const user = userServices.getUserById(req.body)
  res.send(`Get user with id: ${req.params.userId}`)
}
const createNewUser = async (req, res) => {
  try {
    const uid = req.uid.uid
    const userData = {
      name: req.body.name,
      email: req.body.email,
      university: req.body.university
    }

    await userServices.createNewUser(userData, uid)
    res.send({ status: 201, message: 'Create new user success' })
  } catch (error) {
    console.log(error)
    res.send({ status: 500, message: 'Create new user failed' })
  }
}
const updateUserById = (req, res) => {
  // const updatedUser = userServices.updateUserById(req.params.userId, req.body)
  res.send(`Update user with id: ${req.params.userId}`)
}
const deleteUserById = (req, res) => {
  // const deletedUser = userServices.deleteUserById(req.params.userId)
  res.send(`Delete user with id: ${req.params.userId}`)
}

export default {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById
}
