import styles from './page.module.css'
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { createOrder } from "../../services/order.jsx"

export default function Order() {
    const navigate = useNavigate()

    const [cartItems, setCartItems] = useState([])
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        payment: "pix"
    })

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || []
        setCartItems(cart)
    }, [])

    const total = cartItems.reduce((sum, item) => sum + item.price, 0)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const finishOrder = async () => {
        if (!form.name || !form.address) {
            toast.error("Preencha todos os dados obrigatórios ❌")
            return
        }

        const orderData = {
            user: {
                name: form.name,
                email: form.email,
                address: form.address
            },
            items: cartItems,
            paymentMethod: form.payment,
            total
        }

        try {
            const result = await createOrder(orderData)

            if (result.success) {
                toast.success("Pedido realizado com sucesso 🎉")

                localStorage.removeItem("cart")

                setTimeout(() => {
                    navigate("/")
                }, 2000)
            } else {
                toast.error("Erro ao salvar pedido ❌")
            }

        } catch (error) {
            toast.error("Erro de conexão com o servidor")
        }
    }

    if (cartItems.length === 0) {
        return <h2 className={styles.empty}>Carrinho vazio</h2>
    }

    return (
        <div className={styles.orderContainer}>
            <h1>Finalizar Pedido</h1>

            <div className={styles.orderGrid}>
                
                {/* DADOS DO CLIENTE */}
                <div className={styles.box}>
                    <h2>Dados para entrega</h2>

                    <input
                        name="name"
                        placeholder="Nome completo"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <input
                        name="email"
                        placeholder="E-mail"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <textarea
                        name="address"
                        placeholder="Endereço completo"
                        value={form.address}
                        onChange={handleChange}
                    />
                </div>

                {/* PAGAMENTO */}
                <div className={styles.box}>
                    <h2>Pagamento</h2>

                    <label>
                        <input
                            type="radio"
                            name="payment"
                            value="pix"
                            checked={form.payment === "pix"}
                            onChange={handleChange}
                        />
                        Pix
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="payment"
                            value="credit"
                            onChange={handleChange}
                        />
                        Cartão de crédito
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="payment"
                            value="boleto"
                            onChange={handleChange}
                        />
                        Boleto
                    </label>
                </div>

                {/* RESUMO */}
                <div className={styles.box}>
                    <h2>Resumo do pedido</h2>

                    {cartItems.map(item => (
                        <div key={item._id} className={styles.summaryItem}>
                            <span>{item.name}</span>
                            <strong>
                                R$ {item.price.toLocaleString("pt-BR", {
                                    minimumFractionDigits: 2
                                })}
                            </strong>
                        </div>
                    ))}

                    <div className={styles.total}>
                        <span>Total</span>
                        <strong>
                            R$ {total.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2
                            })}
                        </strong>
                    </div>

                    <button
                        className={styles.finishBtn}
                        onClick={finishOrder}
                    >
                        Confirmar pedido
                    </button>
                </div>

            </div>
        </div>
    )
}