import Chats from '../database/Chats.js'

const createChatRoom = async (roomId, participants) => {
  return await Chats.createChatRoom(roomId, participants)
}

const deleteRoomChatById = async (roomId) => {
  return await Chats.deleteRoomChatById(roomId)
}

export default {
  createChatRoom,
  deleteRoomChatById
}
