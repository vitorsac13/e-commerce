import styles from './page.module.css'
import { useEffect, useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Admin() {
    const navigate = useNavigate()
    const authData = JSON.parse(localStorage.getItem("auth"))

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
        available: true
    })
    const [editingId, setEditingId] = useState(null)

    const API_URL = "http://localhost:3000/products"

    // Proteção da rota
    useEffect(() => {
        if (!authData || authData.user.role !== "admin") {
            navigate("/")
        }
    }, [authData, navigate])

    // Buscar produtos
    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setProducts(data.body)
                }
            })
            .finally(() => setLoading(false))
    }, [])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const method = editingId ? "PUT" : "POST"
        const url = editingId ? `${API_URL}/${editingId}` : API_URL

        await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authData.token}`
            },
            body: JSON.stringify({
                ...formData,
                price: Number(formData.price)
            })
        })

        setFormData({ name: "", price: "", image: "", available: true })
        setEditingId(null)
        reloadProducts()
    }

    const reloadProducts = async () => {
        const res = await fetch(API_URL)
        const data = await res.json()
        setProducts(data.body)
    }

    const handleEdit = (product) => {
        setEditingId(product._id)
        setFormData({
            name: product.name,
            price: product.price,
            image: product.image,
            available: product.available
        })
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Deseja remover este produto?")) return

        await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${authData.token}`
            }
        })

        reloadProducts()
    }

    if (loading) {
        return <h2 className={styles.loading}>Carregando produtos...</h2>
    }

    return (
        <div className={styles.container}>
            <h1>Edição de Produtos</h1>

            {/* FORM */}
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nome do produto"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Preço"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="image"
                    placeholder="URL da imagem"
                    value={formData.image}
                    onChange={handleChange}
                    required
                />

                <label className={styles.checkbox}>
                    <input
                        type="checkbox"
                        name="available"
                        checked={formData.available}
                        onChange={handleChange}
                    />
                    Produto disponível
                </label>

                <button type="submit">
                    {editingId ? "Atualizar Produto" : "Adicionar Produto"}
                </button>
            </form>

            {/* LISTA */}
            <div className={styles.list}>
                {products.map(product => (
                    <div key={product._id} className={styles.item}>
                        <img src={product.image} alt={product.name} />

                        <div>
                            <strong>{product.name}</strong><br></br>
                            <span>
                                R$ {Number(product.price).toLocaleString("pt-BR", {
                                    minimumFractionDigits: 2
                                })}
                            </span>
                        </div>

                        <div className={styles.actions}>
                            <button onClick={() => handleEdit(product)}>Editar</button>
                            <button
                                className={styles.delete}
                                onClick={() => handleDelete(product._id)}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}