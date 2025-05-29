import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthenticationContext } from '../services/auth.context'
import { isTokenValid } from "../services/auth/auth.helpers.js"

const Protected = () => {
  const { token } = useContext(AuthenticationContext);

  if(!isTokenValid(token)){
    // importar logout
      return <Navigate to="/login" replace />
  } else {
        return <Outlet />
    }
}

export default Protected