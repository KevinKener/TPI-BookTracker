import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Protected = ({ isLogged }) => {

    if(!isLogged){
        return <Navigate to="/login" replace />
    }

  return (
    <>
        <Outlet />
    </>
  )
}

export default Protected