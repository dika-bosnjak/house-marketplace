import {Navigate, Outlet} from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'

import Spinner from './Spinner'

//PrivateRoute component checks whether the user is logged in, 
//if not user is sent to sign in page, 
//else, the outlet renders the child's element
const PrivateRoute = () => {
    const {loggedIn, checkingStatus} = useAuthStatus()

    if (checkingStatus) {
        return <Spinner />
    }

    return (
    loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
    )
}

export default PrivateRoute