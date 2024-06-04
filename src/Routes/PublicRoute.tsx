import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import {useAppSelector} from '../utils/hooks/reduxHooks'
import {RootState} from '../redux/app/store'

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute:React.FC<PublicRouteProps>=({children})=>{
 const isAuthenticated:boolean=useAppSelector((state:RootState)=>state.auth.isLoggedIn)
 if(isAuthenticated){
    return <Navigate to="/" replace/>
 }

 return <>{children}</>
}

export default PublicRoute
