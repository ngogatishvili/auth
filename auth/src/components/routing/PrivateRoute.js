import React from 'react'
import {Navigate} from "react-router-dom"


const PrivateRoute = ({children}) => {
    if(!localStorage.getItem("authToken")) {
        return <Navigate to="/login"/>
    }else{
        return children;
    }
}

export default PrivateRoute;
