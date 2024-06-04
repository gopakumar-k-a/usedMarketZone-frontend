import React from 'react'
import { useLocation } from 'react-router-dom'
import ForgotPass from '../components/auth/ForgotPass'
import LogIn from '../components/auth/LogIn'
import SignUp from '../components/auth/SignUp'
import Otp from '../components/auth/Otp'

function AuthenticationPage() {

    const location = useLocation()
    return (
        <>
            <div >

                {location.pathname == '/login' && <LogIn />}
                {location.pathname == '/forgot-password' && <ForgotPass />}
                {location.pathname == '/signup' && <SignUp />}
                {location.pathname == '/otp' && <Otp />}

            </div>
        </>
    )
}

export default AuthenticationPage
