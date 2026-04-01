import express from 'express'
import dotenv from 'dotenv'
import carsRouter from './routes/cars.js'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use('/api/cars', carsRouter)

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})