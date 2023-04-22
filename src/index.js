import express from 'express'
import morgan from 'morgan'
import authMiddleware from './middleware/Auth.js'
import userRoutes from './routes/userRoutes.js'
// import tripRoutes from './routes/tripsRoutes.js'

const app = express()
const port = process.env.PORT || 3000
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/users', authMiddleware, userRoutes)
// app.use('/api/users', authMiddleware, tripRoutes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
