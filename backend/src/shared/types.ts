export interface HotelType {
  _id: string
  userId: string
  name: string
  city: string
  state: string
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
