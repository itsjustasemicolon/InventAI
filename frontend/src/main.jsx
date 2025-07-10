import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DemandPredict, PSInsights, Stockreorder, UploadCSV, UpdateData } from './components'
import LoginPage from './components/Login/LoginPage.jsx';
import RegisterPage from './components/Login/RegisterPage.jsx';
import Home from './components/Home.jsx'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: 'predict-demand',
          element: <DemandPredict />,
        },
        {
          path: 'reorder-stock',
          element: <Stockreorder />,
        },
        {
          path: 'ps-insights',
          element: <PSInsights />,
        },
        {
          path: 'upload-csv',
          element: <UploadCSV />,
        },
        {
          path: 'update-data',
          element: <UpdateData />,
        },
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'register',
          element: <RegisterPage />,
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
