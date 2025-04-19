import {  createBrowserRouter } from 'react-router-dom'
import Authentication from './authentication/Authentication.jsx'
import Login from './authentication/pages/Login.jsx'
import Signup from './authentication/pages/Signup.jsx'
import ForgotPassword from './authentication/pages/ForgotPassword.jsx'
import ResetPassword from './authentication/pages/ResetPassword.jsx'

const router = createBrowserRouter([
    {
        path: '/auth',
        element: <Authentication />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'signup',
                element: <Signup />
            },
            {
                path: 'forgot-password',
                element: <ForgotPassword />
            },
            {
                path: 'reset-password',
                element: <ResetPassword />
            }
        ]
    }
])

export default router