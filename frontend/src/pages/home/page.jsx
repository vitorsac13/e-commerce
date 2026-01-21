import styles from './page.module.css'

export default function Home() {
    const products = [
        { id: 1, name: "Notebook Gamer", price: 4599.90 },
        { id: 2, name: "Smartphone Pro", price: 3299.99 },
        { id: 3, name: "Headphone Bluetooth", price: 499.90 },
        { id: 4, name: "Mouse Gamer RGB", price: 199.90 },
        { id: 5, name: "Teclado Mecânico", price: 599.90 },
        { id: 6, name: "Monitor 27''", price: 1899.00 },
        { id: 7, name: "Cadeira Gamer", price: 1499.90 },
        { id: 8, name: "Webcam Full HD", price: 349.90 }
    ]

    return (
        <div className={styles.homeContainer}>
            <h1 className={styles.homeTitle}>🛒 Produtos em destaque</h1>

            <div className={styles.productsGrid}>
                {products.map(product => (
                    <div key={product.id} className={styles.productCard}>
                        <div className={styles.productImage}>
                            <span>Imagem</span>
                        </div>

                        <h2 className={styles.productName}>{product.name}</h2>

                        <p className={styles.productPrice}>
                            R$ {product.price.toFixed(2)}
                        </p>

                        <button className={styles.productButton}>
                            Adicionar ao carrinho
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}