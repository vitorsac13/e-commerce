import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/home/page.jsx'
import Cart from './pages/cart/page.jsx'
import Profile from './pages/profile/page.jsx'
import Auth from './pages/auth/page.jsx'
import Products from './pages/products/page.jsx'
import Product from './pages/product/page.jsx'
import Order from './pages/order/page.jsx'
import MyOrders from './pages/myOrders/page.jsx'
import Admin from './pages/admin/page.jsx'

const pages = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: '/cart', element: <Cart /> },
			{ path: '/profile', element: <Profile /> },
			{ path: '/auth', element: <Auth /> },
			{ path: '/products', element: <Products /> },
			{ path: '/product/:id', element: <Product /> },
			{ path: '/order', element: <Order /> },
			{ path: '/myorders', element: <MyOrders /> },
			{ path: '/admin', element: <Admin /> },
		]
	}
])

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<RouterProvider router={pages}></RouterProvider>
	</StrictMode>,
)
