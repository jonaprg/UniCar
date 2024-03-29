import { authD } from '../database/dbAuth.js'

export const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Not authorization' })
    return
  }
  const token = authorization.split('Bearer ')[1]
  authD.verifyIdToken(token)
    .then((decodedToken) => {
      const { uid } = decodedToken
      req.uid = uid
      next()
    })
    .catch(() => {
      res.status(403).json({ message: 'Not authorized' })
    })
}

export default authMiddleware
