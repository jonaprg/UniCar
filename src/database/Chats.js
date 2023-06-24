import db from './dbAuth.js'

const createChatRoom = async (roomId, participants) => {
  try {
    const chatDoc = await db.collection('chats').doc(roomId).get()

    if (chatDoc.exists) {
      return { status: 209, message: 'This chat room exist' }
    } else {
      const roomData = {
        participants,
        roomId
      }
      await db.collection('chats').doc(roomId).set(roomData)
      return { status: 200, message: 'Create chat room sucess' }
    }
  } catch (error) {
    console.error('Error al crear la sala de chat')
  }
}

const deleteRoomChatById = async (roomId) => {
  try {
    await db.collection('chats').doc(roomId).delete()
    return { status: 200, message: 'Delete chat room sucess' }
  } catch (error) {
    return { status: 400, message: 'Error not delete chat room' }
  }
}

export default {
  createChatRoom,
  deleteRoomChatById
}
