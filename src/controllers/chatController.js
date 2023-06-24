
import chatServices from '../services/chatServices.js'

const createChatRoom = async (req, res) => {
  try {
    const { roomId, participants } = req.body
    const result = await chatServices.createChatRoom(roomId, participants)
    res.status(result.status).send(result)
  } catch (error) {
    console.error('Error al crear la sala de chat', error)
    res.status(500).send({ status: 500, message: 'Error - Not authorized' })
  }
}

const deleteRoomChatById = async (req, res) => {
  try {
    const { roomId } = req.params
    console.log('roomId', roomId)
    const result = await chatServices.deleteRoomChatById(roomId)
    console.log('result', result)
    res.status(result.status).send(result)
  } catch (error) {
    res.status(500).send({ status: 500, message: 'Error - Not authorized' })
  }
}

export default {
  createChatRoom,
  deleteRoomChatById
}
