import auth from '../database/db_auth.js'

export const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Not authorized' })
    return
  }
  const token = authorization.split('Barear ')[1]

  auth.auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken
      next()
    })
    .catch(() => {
      res.status(401).json({ message: 'Not authorized' })
    })
}

export default authMiddleware
