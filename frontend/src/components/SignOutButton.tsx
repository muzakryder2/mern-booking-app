import { useMutation, useQueryClient } from 'react-query'
import { useAppContext } from '../contexts/AppContext'
import * as apiClient from '../api-client'

const SignOutButton = () => {
  const queryClient = useQueryClient()
  const { showToast } = useAppContext()

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken')
      showToast({ type: 'SUCCESS', message: 'Sign out successful!' })
    },
    onError: (error: Error) => {
      showToast({ type: 'ERROR', message: error.message })
    },
  })

  const handleClick = () => {
    mutation.mutate()
  }

  return (
    <button
      className='text-blue-600 px-3 font-bold bg-white hover:bg-gray-100'
      onClick={handleClick}
    >
      Sign Out
    </button>
  )
}
export default SignOutButton
