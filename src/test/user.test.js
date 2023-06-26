import sinon from 'sinon'
import { test } from 'node:test'
import userController from '../controllers/userController.js'
import userServices from '../services/userServices.js'

test('Update the user with name and phone and return success', async () => {
  // Mock input data
  const req = {
    params: { id: '1' },
    body: {
      name: 'John Doe',
      phone: '123456789'
    }
  }

  // Mock the service function
  const updateUserByIdMock = sinon.stub(userServices, 'updateUserById')
  updateUserByIdMock.resolves({ status: 200, message: 'Update user success' })

  // Mock response object
  const res = {
    status: sinon.stub().returnsThis(),
    send: sinon.stub()
  }

  // Call the controller function
  await userController.updateUserById(req, res)

  // Assertions
  sinon.assert.calledWith(updateUserByIdMock, req.body, req.params.id)
  sinon.assert.calledWith(res.status, 200)
  sinon.assert.calledWith(res.send, { status: 200, message: 'Update user success' })

  // Restore the mock
  updateUserByIdMock.restore()
})

test('Update user name should return an error for invalid name', async () => {
  const req = {
    params: { id: '1' },
    body: {
      name: 'This is a very long name that exceeds the maximum limit of 50 characters'
    }
  }

  // Call the controller function
  const res = {
    status: sinon.stub().returnsThis(),
    send: sinon.stub()
  }
  await userController.updateUserById(req, res)

  sinon.assert.calledWith(res.status, 400)
  sinon.assert.calledWith(res.send, {
    status: 400,
    message: 'Name is not valid or too long'
  })
})

test('Update user phone should return an error for invalid phone', async () => {
  const req = {
    params: { id: '1' },
    body: {
      phone: '123423131256'
    }
  }

  const res = {
    status: sinon.stub().returnsThis(),
    send: sinon.stub()
  }
  await userController.updateUserById(req, res)

  sinon.assert.calledWith(res.status, 400)
  sinon.assert.calledWith(res.send, {
    status: 400,
    message: 'Phone number is not valid or too long'
  })
})

test('Update the user with email and return success', async () => {
  // Mock input data
  const req = {
    params: { id: '1' },
    body: {
      email: 'jona@gmail.com'
    }
  }

  // Mock the service function
  const updateUserByIdMock = sinon.stub(userServices, 'updateUserById')
  updateUserByIdMock.resolves({ status: 200, message: 'Update user success' })

  // Mock response object
  const res = {
    status: sinon.stub().returnsThis(),
    send: sinon.stub()
  }

  // Call the controller function
  await userController.updateUserById(req, res)

  // Assertions
  sinon.assert.calledWith(updateUserByIdMock, req.body, req.params.id)
  sinon.assert.calledWith(res.status, 200)
  sinon.assert.calledWith(res.send, { status: 200, message: 'Update user success' })

  // Restore the mock
  updateUserByIdMock.restore()
})

test('Update user email should return an error for invalid email', async () => {
  const req = {
    params: { id: '1' },
    body: {
      email: 'example//aad@gmail.com'
    }
  }

  const res = {
    status: sinon.stub().returnsThis(),
    send: sinon.stub()
  }
  await userController.updateUserById(req, res)

  sinon.assert.calledWith(res.status, 400)
  sinon.assert.calledWith(res.send, {
    status: 400,
    message: 'Email is not valid'
  })
})

test('Update the user with name including characters specials and return error', async () => {
  // Mock input data
  const req = {
    params: { id: '1' },
    body: {
      name: 'John Doe$'
    }
  }
  // Mock response object
  const res = {
    status: sinon.stub().returnsThis(),
    send: sinon.stub()
  }

  // Call the controller function
  await userController.updateUserById(req, res)

  // Assertions
  sinon.assert.calledWith(res.status, 400)
  sinon.assert.calledWith(res.send, {
    status: 400,
    message: 'Name is not valid or too long'
  })
})

test('Update the user with all data and return success', async () => {
  // Mock input data
  const req = {
    params: { id: '1' },
    body: {
      name: 'John Doe',
      phone: '123456789',
      email: 'john@gmail.com',
      university: 'University of Barcelona',
      preferences: ['No fumo', 'No bebo'],
      carBrand: 'Audi',
      carModel: 'A4'

    }
  }

  // Mock the service function
  const updateUserByIdMock = sinon.stub(userServices, 'updateUserById')
  updateUserByIdMock.resolves({ status: 200, message: 'Update user success' })

  // Mock response object
  const res = {
    status: sinon.stub().returnsThis(),
    send: sinon.stub()
  }

  // Call the controller function
  await userController.updateUserById(req, res)

  // Assertions
  sinon.assert.calledWith(updateUserByIdMock, req.body, req.params.id)
  sinon.assert.calledWith(res.status, 200)
  sinon.assert.calledWith(res.send, { status: 200, message: 'Update user success' })

  // Restore the mock
  updateUserByIdMock.restore()
})
