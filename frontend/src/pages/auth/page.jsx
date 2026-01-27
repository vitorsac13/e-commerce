import { useState, useEffect } from "react"
import { TextField, Button } from "@mui/material"
import styles from './page.module.css'
import authServices from "../../services/auth"
import { useNavigate } from "react-router-dom"

export default function Auth() {
    const [formType, setFormType] = useState('login')
    const [formData, setFormData] = useState({})
    const { login, signup, authLoading } = authServices()

    const navigate = useNavigate()
    const authData = JSON.parse(localStorage.getItem('auth'))

    useEffect(() => {
        if(authData){
            navigate ('/profile')
        }
    }, [authData])

    const handleChangeFormType = () => {
        setFormData({})
        setFormType(formType === 'login' ? 'signup' : 'login')
    }

    const handleFormDataChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()

        switch (formType) {
            case 'login':
                login(formData)
            break;
            case 'signup':
                if (formData.password !== formData.confirmPassword) {
                    console.log('Passwords do not match.')
                    return
                }
                signup(formData)
            break;
        }
    }

    return(
        <div className={styles.authPageContainer}>
            {formType === 'login' ? (
            <>
                <h1>Login</h1>
                <button onClick={handleChangeFormType}>Don't you have an account? Click Here!</button>
                <form onSubmit={handleSubmitForm}>
                    <TextField required label="Email" type="email" name="email" onChange={handleFormDataChange}></TextField>
                    <TextField required label="Password" type="password" name="password" onChange={handleFormDataChange}></TextField>
                    <Button type="submit">Login</Button>
                </form>
            </>
            ) : null}
            {formType === 'signup' ? (
            <>
                <h1>SignUp</h1>
                <button onClick={handleChangeFormType}>Do you already have an account? Click Here!</button>
                <form onSubmit={handleSubmitForm}>
                    <TextField required label="Full Name" type="text" name="fullName" onChange={handleFormDataChange}></TextField>
                    <TextField required label="Email" type="email" name="email" onChange={handleFormDataChange}></TextField>
                    <TextField required label="Password" type="password" name="password" onChange={handleFormDataChange}></TextField>
                    <TextField required label="Confirm Password" type="password" name="confirmPassword" onChange={handleFormDataChange}></TextField>
                    <Button type="submit">SignUp</Button>
                </form>
            </>
            ) : null}
        </div>
    )

}