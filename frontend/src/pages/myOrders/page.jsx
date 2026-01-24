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

    if (loading) return <p>Carregando pedidos...</p>

    return (
        <div className={styles.myOrders}>
            <h1>Meus Pedidos</h1>

            {orders.length === 0 && <p>Você ainda não fez pedidos.</p>}

            {orders.map(order => (
                <div key={order._id} className={styles.orderCard}>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Total:</strong> R$ {order.total}</p>
                    <p><strong>Pagamento:</strong> {order.paymentMethod}</p>
                    <p>
                        <strong>Data:</strong>{' '}
                        {new Date(order.createdAt).toLocaleString()}
                    </p>

                    <div className={styles.items}>
                        {order.items.map((item, index) => (
                            <p key={index}>
                                {item.name} - {item.quantity}x
                            </p>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}