import styles from './page.module.css'
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Home() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const API_URL = "http://localhost:3000/products"
    // para os disponíveis: const API_URL = "http://localhost:3000/products/availables"
    

    useEffect(() => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setProducts(data.body)
                }
            })
            .catch(error => {
                console.error("Error loading products:", error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

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
        return <h2 className={styles.loadingText}>Carregando produtos...</h2>
    }

    return (
        <div className={styles.homeContainer}>
            <h1 className={styles.homeTitle}>🛒 Produtos Recomendados</h1>

            <div className={styles.productsGrid}>
                {products.length === 0 && (
                    <p>Nenhum produto encontrado.</p>
                )}

                {products.map(product => (
                    <div key={product._id} className={styles.productCard}>
                        <Link to={`/product/${product._id}`} className={styles.productImage}>
                            <img src={product.image} alt={product.name}/>
                        </Link>

                        <Link to={`/product/${product._id}`} className={styles.productName}>
                            {product.name}
                        </Link>

                        <p className={styles.productPrice}>
                            R$ {Number(product.price).toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}
                        </p>

                        <button className={styles.productButton} onClick={() => {
                            addToCart(product)
                            toast.success('Produto adicionado ao carrinho 🛒', {
                            position: 'bottom-right',
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true
                            })
                        }}>
                            Adicionar ao carrinho
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}