import { useState } from "react"
import Form from "../../components/form"

export default function Login(){
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState({
        email: false,
        password: false
    })

    const errorMessages = {
        email: {
            message: "Enter valid email",
            isValid: formData.email.length > 0,
            onError: () => {
                setError((error)=>({...error, email: true}))
            }
        }, 
        password: {
            message: "Incorrect password",
            isValid: formData.password.length > 0,
            onError: () => {
                setError((error)=>({...error, password: true}))
            }
        }
    }

    const formFields = [
        {
            name: "email",
            type: "email",
            placeholder: "Enter your email",
            value: formData.email,
            onChange: (e) => {
                setFormData({...formData, email: e.target.value})
                setError((error)=>({...error, email: false}))
            }
        },
        {
            name: "password",
            type: "password",
            placeholder: "Enter your password",
            value: formData.password,
            onChange: (e) => {
                setFormData({...formData, password: e.target.value})
                setError((error)=>({...error, password: false}))
            }
        }
    ]
    
    const onSubmit = (e) => {
        e.preventDefault()
        Object.keys(errorMessages).map((key) => {
            
            if(!errorMessages[key].isValid) {
                console.log("Error keys: ", key)
                errorMessages[key].onError()
            }
        })
        console.log("Error List: ", error)
    }

    return(
        <div>
            <p>Login Page</p>
            <Form
                formFields={formFields}
                error={error}
                errorMessages={errorMessages}
                onSubmit={onSubmit}
            />
            <img src="job"/>
        </div>

    )
}