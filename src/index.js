import express from 'express'
import routes from './routes/userRoutes.js'

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

app.use('/api/users', routes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
