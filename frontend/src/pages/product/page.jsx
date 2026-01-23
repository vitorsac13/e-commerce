import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import styles from './page.module.css'

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

        const alreadyInCart = cart.find(item => item._id === product._id)

        if (!alreadyInCart) {
            cart.push(product)
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }

    if (loading) {
        return <h2 className={styles.loading}>Carregando produto...</h2>
    }

    if (!product) {
        return <h2 className={styles.loading}>Produto não encontrado</h2>
    }

    return (
        <div className={styles.productDetailsContainer}>
            <div className={styles.productDetailsCard}>
                <div className={styles.productImage}>
                    <img src={product.image} alt={product.name} />
                </div>

                <div className={styles.productInfo}>
                    <h1>{product.name}</h1>

                    <p className={styles.productPrice}>
                        R$ {Number(product.price).toFixed(2)}
                    </p>

                    <p className={`product-status ${product.available ? "available" : "unavailable"}`}>
                        {product.available ? "Disponível" : "Indisponível"}
                    </p>

                    <div className={styles.productActions}>
                        <button onClick={() => navigate("/")}>
                            Voltar
                        </button>

                        <button className={styles.buy}
                        onClick={() => {
                            addToCart(product)
                            alert('Produto adicionado ao carrinho 🛒')
                        }}
                        >Comprar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}