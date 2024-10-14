import {createBrowserRouter} from 'react-router-dom'
import Home from './Pages/Home/Home.jsx'
import Login from './Pages/Login/Login.jsx'
import Orders from './Pages/Orders/Orders.jsx'
import Promotions from './Pages/Promotions/Promotions.jsx'
import Account from './Pages/Account/Account.jsx'
import Cart from './Pages/Cart/Cart.jsx'
import RootLayout from './Pages/Layout.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [{
            index: true,
            element: <Home/>
        },
        {
            path: 'login',
            element: <Login/>
        },{
            path: 'Orders',
            element: <Orders/>
        },{
            path: 'promotions',
            element: <Promotions/>
        },{
            path: 'account',
            element: <Account/>
        },{
            path: 'cart',
            element: <Cart/>
        }]
    }
])

export default router