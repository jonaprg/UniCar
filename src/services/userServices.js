import Users from '../database/Users.js'

const getUserById = async (id) => {
  return await Users.getUserById(id)
}

const createNewUser = async (data, uid) => {
  if (data.name) {
    if (!isValidateInputWithMaxLength(data.name)) {
      return { status: 400, message: 'Name is not valid or too long (max 20 characters)' }
    }
  }
  if (data.university) {
    if (!isValidateInputWithMaxLength(data.university)) {
      return { status: 400, message: 'University is not valid or too long (max 20 characters)' }
    }
  }
  return await Users.createNewUser(data, uid)
}

const updateUserById = async (data, uid) => {
  if (data.phone) {
    if (!validateNumero(Number(data.phone))) {
      return { status: 400, message: 'Phone number is not valid or too long (max 9 characters)' }
    }
  }
  if (data.name) {
    if (!isValidateInputWithMaxLength(data.name)) {
      return { status: 400, message: 'Name is not valid or too long (max 20 characters)' }
    }
  }

  return await Users.updateUserById(data, uid)
}

const deleteUserById = async (id) => {
  return await Users.deleteUserById(id)
}

const validateNumero = (numero) => {
  const regex = /^\d{6,9}$/
  console.log(regex.test(numero))
  return regex.test(numero)
}

const isValidateInputWithMaxLength = (input) => {
  const regex = /^[a-zA-Z0-9]+$/
  const containsSafeCharacters = regex.test(input)
  const hasValidLength = input.length <= 20

  return containsSafeCharacters && hasValidLength
}

export default {
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById
}
