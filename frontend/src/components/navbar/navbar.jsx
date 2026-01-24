import styles from './navbar.module.css'
import { LuShoppingCart, LuUserRound, LuMenu, LuHouse, LuLaptopMinimalCheck   } from "react-icons/lu"
import { Drawer } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const [openMenu, setOpenMenu] = useState(false)

    return (
        <nav className={styles.navbarContainer}>
            {/* DESKTOP */}
            <div className={styles.navbarItems}>
                <div className={styles.navbarLeft}>
                    <Link to="/products" className={styles.navbarIcon}><LuLaptopMinimalCheck /></Link>
                </div>

                <div className={styles.navbarRight}>
                    <Link to="/myorders" className={styles.navbarLink}>Meus Pedidos</Link>
                    <Link to="/"><LuHouse className={styles.navbarIcon} /></Link>
                    <Link to="/cart"><LuShoppingCart className={styles.navbarIcon} /></Link>
                    <Link to="/profile"><LuUserRound className={styles.navbarIcon} /></Link>
                </div>
            </div>

            {/* MOBILE */}
            <div className={styles.mobileNavbarItems}>
                <Link to="/cart">
                    <LuShoppingCart className={styles.navbarIcon} />
                </Link>

                <LuMenu
                    className={styles.navbarIcon}
                    onClick={() => setOpenMenu(!openMenu)}
                />
            </div>

            <Drawer anchor="right" open={openMenu} onClose={() => setOpenMenu(false)}>
                <div className={styles.drawer}>
                    <Link to="/" className={styles.drawerLink}>Home</Link>
                    <Link to="/products" className={styles.drawerLink}>Produtos</Link>
                    <Link to="/profile" className={styles.drawerLink}>Perfil</Link>
                </div>
            </Drawer>
        </nav>
    )
}