import { createBrowserRouter } from  'react-router-dom'
import App  from './App'
import UserDetails from './components/UserDetails'
import Users from './components/Users'
import ErrorPage from './components/ErrorPage'




export const routes = createBrowserRouter([

    {
      path: '/',
      element : <App></App>,
      children : [
        {
            index: true,
            element:<Users></Users>
        },
        {
            path: 'user/:userId',
            element : <UserDetails></UserDetails>
          }
      ]
  
    },
    {
      path: '*',
      element: <ErrorPage></ErrorPage>
    }


    
  ]
  
  )