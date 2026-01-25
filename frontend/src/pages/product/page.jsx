import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import styles from './page.module.css'
import { toast } from 'react-toastify'

export default function Product() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setProduct(data.body)
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [id])

    const addToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || []

        const existing = cart.find(item => item._id === product._id)

        if (existing) {
            existing.quantity += 1
        } else {
            cart.push({ ...product, quantity: 1 })
        }

        localStorage.setItem('cart', JSON.stringify(cart))
        setCartItems(cart)
    }

    if (loading) {
        return <h2 className={styles.loading}>Carregando produto...</h2>
    }

    if (!product) {
        return <h2 className={styles.loading}>Produto não encontrado</h2>
    }

    return (
        <div className={styles.productPage}>
            <div className={styles.productCard}>
                
                {/* COLUNA ESQUERDA */}
                <div className={styles.leftColumn}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className={styles.productImage}
                    />

                    <div className={styles.descriptionBox}>
                        <h3>Descrição</h3>
                        <p>
                            {product.description || "Descrição não disponível."}
                        </p>
                    </div>
                </div>

                {/* COLUNA DIREITA */}
                <div className={styles.rightColumn}>
                    <h1>{product.name}</h1>

                    <p className={styles.price}>
                        R$ {Number(product.price).toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}
                    </p>

                    <span
                        className={`${styles.status} ${
                            product.available ? styles.available : styles.unavailable
                        }`}
                    >
                        {product.available ? "Disponível" : "Indisponível"}
                    </span>

                    <div className={styles.specs}>
                        <h3>Especificações</h3>

                        <ul>
                            <li><strong>Marca:</strong> {product.brand || "-"}</li>
                            <li><strong>Categoria:</strong> {product.category || "-"}</li>
                            <li><strong>Peso:</strong> {product.weight || "-"} kg</li>
                        </ul>
                    </div>

                    <div className={styles.actions}>
                        <button onClick={() => navigate("/")}>
                            Voltar
                        </button>

                        <button
                            className={styles.buyButton}
                            onClick={() => {
                                addToCart(product)
                                toast.success('Produto adicionado ao carrinho 🛒', {
                                    position: 'bottom-right',
                                    autoClose: 2000
                                })
                            }}
                        >
                            Comprar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}