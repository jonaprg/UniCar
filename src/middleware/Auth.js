import { authD } from '../database/dbAuth.js'

export const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers
  console.log('authorization: ', authorization)
  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Not authorized' })
    return
  }
  const token = authorization.split('Bearer ')[1]
  console.log('token', token)
  authD.verifyIdToken(token)
    .then((decodedToken) => {
      req.uid = decodedToken
      next()
    })
    .catch(() => {
      res.status(403).json({ message: 'Not authorized' })
    })
}

export default authMiddleware
