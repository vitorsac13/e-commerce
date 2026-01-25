import styles from './page.module.css'
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { getMyOrders } from "../../services/order.jsx"

export default function MyOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadOrders() {
            const response = await getMyOrders()
            setOrders(response.body || [])
            setLoading(false)
        }

        loadOrders()
    }, [])

    if (loading) {
        return <p className={styles.loading}>Carregando pedidos...</p>
    }

    return (
        <div className={styles.container}>
            <h1>Meus Pedidos</h1>

            {orders.length === 0 && (
                <div className={styles.empty}>
                    <p>Você ainda não fez pedidos.</p>
                </div>
            )}

            <div className={styles.orders}>
                {orders.map(order => (
                    <div key={order._id} className={styles.orderCard}>

                        {/* HEADER */}
                        <div className={styles.header}>
                            <span>
                                Pedido #{order._id.slice(-6).toUpperCase()}
                            </span>
                            <span className={styles.status}>
                                {order.status}
                            </span>
                        </div>

                        {/* ITENS */}
                        <div className={styles.items}>
                            {order.items.map((item, index) => (
                                <div key={index} className={styles.item}>
                                    <span>{item.name}</span>
                                    <span>{item.quantity}x</span>
                                </div>
                            ))}
                        </div>

                        {/* FOOTER */}
                        <div className={styles.footer}>
                            <span>
                                Total: R$ {order.total.toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2
                                })}
                            </span>
                            <span>
                                {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}