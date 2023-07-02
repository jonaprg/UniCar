import Users from '../database/Users.js'

const getUserById = async (id) => {
  return await Users.getUserById(id)
}

const createNewUser = async (data, uid) => {
  return await Users.createNewUser(data, uid)
}

const updateUserById = async (data, uid) => {
  if (data.phone) {
    if (!validateNumero(Number(data.phone))) {
      return { status: 400, message: 'Phone number is not valid or too long' }
    }
  }
  if (data.name) {
    if (!isValidateInputWithMaxLength(data.name)) {
      return { status: 400, message: 'Name is not valid or too long' }
    }
  }

  if (data.university) {
    if (!isValidateInputWithMaxLength(data.university)) {
      return { status: 400, message: 'University is not valid or too long' }
    }
  }

  if (data.email) {
    if (!validateEmail(data.email)) {
      return { status: 400, message: 'Email is not valid' }
    }
  }

  return await Users.updateUserById(data, uid)
}

const deleteUserById = async (id) => {
  return await Users.deleteUserById(id)
}

const validateEmail = (email) => {
  const regex = /^[A-Za-z0-9]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  return regex.test(email)
}

const validateNumero = (numero) => {
  const regex = /^\d{6,9}$/
  return regex.test(numero)
}

const isValidateInputWithMaxLength = (input) => {
  const regex = /^[A-Za-z\s]+$/
  const containsSafeCharacters = regex.test(input)
  const hasValidLength = input.length <= 35

  return containsSafeCharacters && hasValidLength
}

export default {
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById
}
