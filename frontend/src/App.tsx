import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layouts/Layout'
import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage'
import RegisterPage from './pages/RegisterPage'
import SearchPage from './pages/SearchPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'sign-in',
        element: <SignInPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
    ],
  },
])
function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
