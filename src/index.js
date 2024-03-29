import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import tripRoutes from './routes/tripsRoutes.js'
import chatRoutes from './routes/chatRoutes.js'

const app = express()
const port = process.env.PORT || 3000
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/trips', tripRoutes)
app.use('/api/v1/chats', chatRoutes)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
