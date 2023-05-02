import admin from '../database/dbAuth.js'

export const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Not authorized' })
    return
  }
  const token = authorization.split('Barear ')[1]

  admin.auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.uid = decodedToken
      next()
    })
    .catch(() => {
      res.status(403).json({ message: 'Not authorized' })
    })
}

export default authMiddleware
