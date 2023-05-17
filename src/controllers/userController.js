import userServices from '../services/userServices.js'

const getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const user = await userServices.getUserById(id)
    res.send(user)
  } catch {
    res.send(`Eror Get user with id: ${req.params.userId}`)
  }
}
const createNewUser = async (req, res) => {
  try {
    const id = req.body.uid
    const userData = {
      name: req.body.name,
      email: req.body.email,
      university: req.body.university
    }

    await userServices.createNewUser(userData, id)
    res.send({ status: 201, message: 'Create new user success' })
  } catch (error) {
    console.log(error)
    res.send({ status: 500, message: 'Create new user failed' })
  }
}
const updateUserById = async (req, res) => {
  const { id } = req.params
  console.log('body', req.body)
  console.log('id', id)
  const userData = req.body
  try {
    await userServices.updateUserById(userData, id)
    res.send({ status: 200, message: `Update userID${id}` })
  } catch (error) {
    res.send({ status: 500, message: `Error Update userId ${id}` })
  }
}
const deleteUserById = async (req, res) => {
  const { id } = req.params
  try {
    await userServices.deleteUserById(id)
    res.send({ status: 200, message: `Delete user with id: ${id}` })
  } catch {
    res.send({ status: 500, message: `Error delete user with id: ${id}` })
  }
}

export default {
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById
}
