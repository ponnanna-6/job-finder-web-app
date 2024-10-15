import { useState } from "react"
import Form from "../../components/form/form"
import jobImage from "../../assets/job_finder_image.png"
import { useNavigate} from "react-router-dom"
import { loginUser } from "../../services/auth"

export default function Login(){
    const navigate = useNavigate()
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
            message: "Please enter password",
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
    
    const onSubmit = async(e) => {
        e.preventDefault()
        let isError = false
        Object.keys(errorMessages).map((key) => {
            if(!errorMessages[key].isValid) {
                isError = true
                errorMessages[key].onError()
            }
        })
        if(!isError){
            const res = await loginUser({
                email: formData.email,
                password: formData.password
            })
            if(res.status == 200) {
                alert(res.data.message)
                localStorage.setItem('token', res.data.token)
                navigate('/')
            } else{
                alert(res.message)
            }
        }
    }

    return(
        <div style={{flexDirection: 'row', display: 'flex'}}>
            <div style={{ width: '50vw', height: '100vh'}}>
                <p>Already have an account ?</p>
                <p>Your personal job finder</p>
                <Form
                    formFields={formFields}
                    error={error}
                    errorMessages={errorMessages}
                    onSubmit={onSubmit}
                />
                <p>
                    Don’t have an account? 
                    <b><u onClick={()=>navigate('/register')} style={{cursor: 'pointer'}}>
                        Sign up
                    </u></b>
                </p>
            </div>
            <img src={jobImage} alt="Image" style={{ width: '50vw', height: '100vh' }}/>
        </div>
    )
}