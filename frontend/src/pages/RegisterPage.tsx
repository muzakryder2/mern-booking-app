import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import * as apiClient from '../api-client'
import { useAppContext } from '../contexts/AppContext'
import { Link, useNavigate } from 'react-router-dom'

export type RegisterFormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}
const RegisterPage = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { showToast } = useAppContext()

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>()

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ type: 'SUCCESS', message: 'Registration Success!' })
      await queryClient.invalidateQueries('validateToken')
      navigate('/')
    },
    onError: (error: Error) => {
      showToast({ type: 'ERROR', message: error.message })
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data)
  })

  return (
    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
      <h2 className='text-3xl font-bold'>Create an Account</h2>
      <div className='flex flex-col md:flex-row gap-5'>
        <label className='text-gray-700 text-sm font-bold flex-1' htmlFor=''>
          First Name
          <input
            className='border rounded w-full py-1 px-2 font-normal'
            {...register('firstName', { required: 'This field is required.' })}
            type='text'
          />
          {errors.firstName && (
            <span className='text-red-500 font-semibold italic'>
              {errors.firstName.message}
            </span>
          )}
        </label>
        <label className='text-gray-700 text-sm font-bold flex-1' htmlFor=''>
          Last Name
          <input
            className='border rounded w-full py-1 px-2 font-normal'
            {...register('lastName', { required: 'This field is required.' })}
            type='text'
          />
          {errors.lastName && (
            <span className='text-red-500 font-semibold italic'>
              {errors.lastName.message}
            </span>
          )}
        </label>
      </div>
      <label className='text-gray-700 text-sm font-bold flex-1' htmlFor=''>
        Email
        <input
          className='border rounded w-full py-1 px-2 font-normal'
          {...register('email', { required: 'This field is required.' })}
          type='email'
        />
        {errors.email && (
          <span className='text-red-500 font-semibold italic'>
            {errors.email.message}
          </span>
        )}
      </label>
      <label className='text-gray-700 text-sm font-bold flex-1' htmlFor=''>
        Password
        <input
          className='border rounded w-full py-1 px-2 font-normal'
          {...register('password', {
            required: 'This field is required.',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters.',
            },
          })}
          type='password'
        />
        {errors.password && (
          <span className='text-red-500 font-semibold italic'>
            {errors.password.message}
          </span>
        )}
      </label>
      <label className='text-gray-700 text-sm font-bold flex-1' htmlFor=''>
        Confirm Password
        <input
          className='border rounded w-full py-1 px-2 font-normal'
          {...register('confirmPassword', {
            validate: (val) => {
              if (!val) {
                return 'This field is required.'
              } else if (watch('password') !== val) {
                return 'Your passwords do not match.'
              }
            },
          })}
          type='password'
        />
        {errors.confirmPassword && (
          <span className='text-red-500 font-semibold italic'>
            {errors.confirmPassword.message}
          </span>
        )}
      </label>
      <span className='flex items-center justify-between'>
        <span className='text-sm'>
          Already have an account?{' '}
          <Link className='underline' to='/sign-in'>
            Sign in here
          </Link>
        </span>
        <button
          className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl'
          type='submit'
        >
          Create Account
        </button>
      </span>
    </form>
  )
}
export default RegisterPage
