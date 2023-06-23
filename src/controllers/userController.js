import userServices from '../services/userServices.js'

const getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const user = await userServices.getUserById(id)
    res.status(user.status).send(user)
  } catch {
    res.status(500).send('Eror Get user')
  }
}
const createNewUser = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email) {
      res.status(400).send({ status: 400, message: 'Please provide all data' })
      return
    }

    const id = req.params.id
    const userData = {
      name: req.body.name,
      email: req.body.email,
      uid: id
    }

    const resCUser = await userServices.createNewUser(userData, id)
    res.status(resCUser.status).send(resCUser)
  } catch (error) {
    console.log(error)
    res.status(500).send({ status: 500, message: 'Create new user failed' })
  }
}
const updateUserById = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).send({ status: 400, message: 'Please provide id' })
      return
    }

    const { id } = req.params
    if (!req.body) {
      res.status(400).send({ status: 400, message: 'Please provide all data' })
      return
    }
    const userData = req.body
    console.log(userData)
    const response = await userServices.updateUserById(userData, id)
    console.log(response)
    res.status(response.status).send(response)
  } catch (error) {
    res.status(404).send({ status: 404, message: 'Error update user' })
  }
}

const deleteUserById = async (req, res) => {
  const { id } = req.params
  try {
    const response = await userServices.deleteUserById(id)
    console.log(response)
    res.status(response.status).send(response)
  } catch {
    res.status(500).send({ status: 500, message: 'Error delete user' })
  }
}

export default {
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById
}
