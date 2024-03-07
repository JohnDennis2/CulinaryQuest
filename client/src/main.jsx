import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
//import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import LogiLoginSignUpPage from "./pages/ LoginSIgnUpPage.jsx"
import Home from "./pages/Home.jsx"   
import Portfolio from './pages/Portfolio.jsx'
import Resume from './pages/Resume.jsx'

const newRoute = createBrowserRouter([
  {
    path: '/', //sets landing page and base url
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <LogiLoginSignUpPage />
      }, 
      {
        path: '/Home',
        element: <Home />
      },
      {
        path: '/portfolio',
        element: <Portfolio />
      },
      {
        path: '/resume',
        element: <Resume />
      },

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={newRoute} />
)