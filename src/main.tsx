import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OrdersList from './components/OrdersList.tsx';
import RootLayout from './layouts/RootLayout.tsx';
import OrderDetails from './components/OrderDetails.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <OrdersList />,
      },
      {
        path: "/orders",
        element: <OrdersList />,
      },
      {
        path: "/orders/:orderId",
        element: <OrderDetails />,
      },
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
