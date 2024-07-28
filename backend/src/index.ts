import express, { Request, Response } from 'express'
import { v2 as cloudinary } from 'cloudinary'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import 'dotenv/config'
import mongoose from 'mongoose'
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import myHotelRoutes from './routes/my-hotels'

const port = process.env.PORT || 7000

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const connection = mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING as string
)

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
)

app.use(express.static(path.join(__dirname, '../../frontend/dist')))

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/my-hotels', myHotelRoutes)

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
})

app.listen(port, () => console.log(`server started on localhost:${port}`))
