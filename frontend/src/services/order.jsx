const API_URL = 'http://localhost:3000/orders'

export async function createOrder(orderData) {
    const auth = JSON.parse(localStorage.getItem('auth'))

    const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`
        },
        body: JSON.stringify(orderData)
    })

    return response.json()
}

export async function getMyOrders() {
    const auth = JSON.parse(localStorage.getItem('auth'))

    const response = await fetch('http://localhost:3000/orders/my', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`
        }
    })

    return response.json()
}