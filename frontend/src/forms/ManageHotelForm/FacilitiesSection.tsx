import { useFormContext } from 'react-hook-form'
import { HotelFormData } from './ManageHotelForm'
import { hotelFacilities } from '../../config/hotel-options-config'

function FacilitiesSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>()

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-2xl font-bold mb-3'>Facilties</h2>
      <div className='grid grid-cols-5 gap-3'>
        {hotelFacilities.map((facility, index) => (
          <label className='text-sm flex gap-2 text-gray-700' key={index}>
            <input
              type='checkbox'
              value={facility}
              {...register('facilities', {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true
                  } else {
                    return 'At least one facility is required'
                  }
                },
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className='text-red-500 text-sm font-bold'>
          {errors.facilities.message}
        </span>
      )}
    </div>
  )
}
export default FacilitiesSection
