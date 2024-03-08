import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import AuthPage from "./pages/AuthPage.jsx"
import Home from "./pages/Home.jsx"   



const newRoute = createBrowserRouter([
  {
    path: '/', //sets landing page and base url
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Home />
      }, 
      {
        path: '/AuthPage',
        element: <AuthPage />
      },
    //   {
    //     path: '/SingleQuest',
    //     element: <SingleQuest />
    //   },
    //   {
    //     path: '/StartQuest',
    //     element: <StartQuest />
    //   },

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={newRoute} />
)