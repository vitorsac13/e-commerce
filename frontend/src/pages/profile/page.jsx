import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import authServices from "../../services/auth"

export default function Profile() {
    const { logout } = authServices
    const navigate = useNavigate()
    const authData = JSON.parse(localStorage.getItem('auth'))

    useEffect(() => {
        if(!authData){
            return navigate ('/auth')
        }
    }, [authData])

    const handleLogout = () => {
        logout()
        return navigate('/')
    }
    return (
        <>
        <h1>Profile</h1>
        <button onClick={handleLogout}>Logout</button>
        </>
    )
}