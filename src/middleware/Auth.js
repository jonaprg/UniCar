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
      console.log('Auth middleware')
      const { uid } = decodedToken
      if (uid !== req.params.id) {
        res.status(403).json({ message: 'Forbidden' })
        return
      }

      req.uid = decodedToken.uid
      console.log(req.uid)
      next()
    })
    .catch(() => {
      res.status(403).json({ message: 'Not authorized' })
    })
}

export default authMiddleware
