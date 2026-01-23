import { useEffect, useState } from 'react'
import { LuTrash2 } from 'react-icons/lu'
import styles from './page.module.css'

export default function Cart() {
    const [cartItems, setCartItems] = useState([])
    const [coupon, setCoupon] = useState('')
    const [discount, setDiscount] = useState(0)

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || []
        setCartItems(cart)
    }, [])

    const removeItem = (id) => {
        const updatedCart = cartItems.filter(item => item._id !== id)
        setCartItems(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }

    const applyCoupon = () => {
        if (coupon === 'DESCONTO5') {
            setDiscount(0.05)
        } else {
            alert('Cupom inválido ❌')
            setDiscount(0)
        }
    }

    const getTotal = () => {
        const total = cartItems.reduce((sum, item) => sum + item.price, 0)
        return total - (total * discount)
    }

    if (cartItems.length === 0) {
        return (
            <div className={styles.emptyCart}>
                <h2>Seu carrinho está vazio 🛒</h2>
            </div>
        )
    }

    return (
        <div className={styles.cartContainer}>
            <h1>Carrinho</h1>

            <div className={styles.cartContent}>
                <div className={styles.items}>
                    {cartItems.map(product => (
                        <div key={product._id} className={styles.cartItem}>
                            <img
                                src={product.image}
                                alt={product.name}
                            />

                            <div className={styles.itemInfo}>
                                <h3>{product.name}</h3>
                                <span>R$ {Number(product.price).toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}</span>
                            </div>

                            <button
                                className={styles.removeBtn}
                                onClick={() => removeItem(product._id)}
                            >
                                <LuTrash2 className={styles.trashIcon} />
                                Remover
                            </button>
                        </div>
                    ))}
                </div>

                <div className={styles.summary}>
                    <h2>Resumo</h2>
                    <div className={styles.coupon}>
                        <input
                            type="text"
                            placeholder="Cupom de desconto"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                        />
                        <button onClick={applyCoupon}>
                            Aplicar
                        </button>
                    </div>
                    <div className={styles.summaryLine}>
                        {discount > 0 && (
                            <div className={styles.summaryLine}>
                                <span>Desconto</span>
                                <strong>-5%</strong>
                            </div>
                        )}
                        <span>Total</span>
                        <strong>R$ {getTotal().toLocaleString('pt-BR', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}</strong>
                    </div>

                    <button className={styles.checkoutBtn}>
                        Finalizar compra
                    </button>
                </div>
            </div>
        </div>
    )
}