import express, { Request, Response } from 'express'
import multer from 'multer'
import cloudinary from 'cloudinary'
import Hotel from '../models/hotel'
import verifyToken from '../middleware/auth'
import { body } from 'express-validator'
import { HotelType } from '../shared/types'

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
})

router.post(
  '/',
  verifyToken,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('state').notEmpty().withMessage('State is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('type').notEmpty().withMessage('Type is required'),
    body('facilities')
      .notEmpty()
      .isArray()
      .withMessage('Facilities are required'),
    body('pricePerNight')
      .notEmpty()
      .isNumeric()
      .withMessage('Price per night is required and must be a number'),
    body('starRating').notEmpty().withMessage('Name is required'),
  ],
  upload.array('imageFiles', 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[]
      const newHotel: HotelType = req.body

      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString('base64')
        let dataURI = 'data:' + image.mimetype + ';base64,' + b64
        const res = await cloudinary.v2.uploader.upload(dataURI)
        return res.url
      })

      const imageUrls = await Promise.all(uploadPromises)

      newHotel.imageUrls = imageUrls
      newHotel.lastUpdated = new Date()
      newHotel.userId = req.userId

      const hotel = new Hotel(newHotel)
      await hotel.save()

      res.status(201).send(hotel)
    } catch (error) {
      console.log('Error creating hotel:', error)
      res.status(500).json({ message: 'Something went wrong' })
    }
  }
)

router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId })
    res.json(hotels)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotels' })
  }
})

export default router
