import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DemandPredict, PSInsights, Stockreorder } from './components'
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
        } , 
        {
          path : 'reorder-stock' ,
          element : <Stockreorder />,
        } , 
        {
          path : 'ps-insights' ,
          element : <PSInsights />,
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
