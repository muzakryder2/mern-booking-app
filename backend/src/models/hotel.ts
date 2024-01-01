import mongoose from 'mongoose'

export type HotelType = {
  _id: string
  userId: string
  name: string
  city: string
  country: string
  description: string
  type: string
  adultCount: number
  childCount: number
  facilities: string[]
  pricePerNight: number
  starRating: number
  imageUrls: string[]
  lastUpdated: Date
}

const hotelSchema = new mongoose.Schema<HotelType>({
  userId: { type: String, requred: true },
  name: { type: String, requred: true },
  city: { type: String, requred: true },
  country: { type: String, requred: true },
  description: { type: String, requred: true },
  type: { type: String, requred: true },
  adultCount: { type: Number, requred: true },
  childCount: { type: Number, requred: true },
  facilities: [{ type: String, requred: true }],
  pricePerNight: { type: Number, requred: true },
  starRating: { type: Number, requred: true, min: 1, max: 5 },
  imageUrls: [{ type: String, requred: true }],
  lastUpdated: { type: Date, requred: true },
})

const Hotel = mongoose.model('Hotel', hotelSchema)
export default Hotel
