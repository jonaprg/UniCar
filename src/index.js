import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import tripRoutes from './routes/tripsRoutes.js'

const app = express()
const port = process.env.PORT || 3000
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', userRoutes)
app.use('/api/trips', tripRoutes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
