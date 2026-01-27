import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import authServices from "../../services/auth"
import styles from './page.module.css'

export default function Profile() {
    const { logout } = authServices()
    const navigate = useNavigate()
    const authData = JSON.parse(localStorage.getItem("auth"))

    useEffect(() => {
        if (!authData) {
            navigate("/auth")
        }
    }, [authData, navigate])

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    const handleEditProducts = () => {
        navigate("/admin")
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileCard}>
                <div className={styles.profileAvatar}>
                    {authData?.user?.email?.charAt(0).toUpperCase()}
                </div>

                <h1 className={styles.profileName}>
                    {authData?.user?.fullname || "User"}
                </h1>

                <p className={styles.profileEmail}>
                    {authData?.user?.email}
                </p>

                <div className={styles.profileAction}>
                    {authData?.user?.role === 'admin' && (
                        <button
                            className={`${styles.btn} ${styles.adminBtn}`}
                            onClick={handleEditProducts}
                        >
                            Editar Produtos
                        </button>
                    )}
                    <button className={styles.btn} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}