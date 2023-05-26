import userServices from '../services/userServices.js'

const getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const user = await userServices.getUserById(id)
    res.send(user)
  } catch {
    res.send('Eror Get user')
  }
}
const createNewUser = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.university) {
      res.send({ status: 400, message: 'Please provide all data' })
      return
    }

    const id = req.params.id
    const userData = {
      name: req.body.name,
      university: req.body.university,
      email: req.body.email
    }

    const resCUser = await userServices.createNewUser(userData, id)
    res.send(resCUser)
  } catch (error) {
    console.log(error)
    res.send({ status: 500, message: 'Create new user failed' })
  }
}
const updateUserById = async (req, res) => {
  try {
    if (!req.params.id) {
      res.send({ status: 400, message: 'Please provide id' })
      return
    }

    const { id } = req.params
    if (!req.body) {
      res.send({ status: 400, message: 'Please provide all data' })
      return
    }
    const userData = req.body
    const response = await userServices.updateUserById(userData, id)
    console.log(response)
    res.send(response)
  } catch (error) {
    res.send({ status: 404, message: 'Error update user' })
  }
}
const deleteUserById = async (req, res) => {
  const { id } = req.params
  try {
    const response = await userServices.deleteUserById(id)
    res.send(response)
  } catch {
    res.send({ status: 500, message: 'Error delete user' })
  }
}

export default {
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById
}
