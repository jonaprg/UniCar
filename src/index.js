import express from 'express'
import morgan from 'morgan'
import userRoutes from './routes/userRoutes.js'

const app = express()
const port = process.env.PORT || 3000
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/users', userRoutes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
