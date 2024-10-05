import {useState } from "react";
import Form from "../../components/form"
import jobImage from "../../assets/job_finder_image.png"

export default function Register(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [error, setError] = useState({
        name: false,
        email: false,
        password: false,
        currentPassword: false
    })

    const formFields = [
        {
            name: "name",
            type: "text",
            value: formData.name,
            placeholder: "Enter your name",
            onChange: (e) => {
                setFormData({...formData, name: e.target.value})
                setError((error) => ({...error, name:false}))
            }
        },
        {
            name: "email",
            type: "email",
            value: formData.email,
            placeholder: "Enter your email",
            onChange: (e) => {
                setFormData({...formData, email: e.target.value})
                setError((error) => ({...error, email:false}))
            }
        },
        {
            name: "password",
            type: "password",
            value: formData.password,
            placeholder: "Enter your password",
            onChange: (e) => {
                setFormData({...formData, password: e.target.value})
                setError((error) => ({...error, password:false}))
            }
        },
        {
            name: "confirmPassword",
            type: "password",
            value: formData.currentPassword,
            placeholder: "Confirm your password",
            onChange: (e) => {
                setFormData({...formData, confirmPassword: e.target.value})
                setError((error) => ({...error, confirmPassword:false}))
            }
        }
    ]
    const errorMessages = {
        name: {
            message: "Name is required",
            isValid: formData.name.length>0,
            onError: ()=>{
                setError((error) => ({...error, name:true}))
            }
        },
        email:{
            message: "Email is required",
            isValid: formData.email.length>0,
            onError: ()=>{
                setError((error) => ({...error, email:true}))
            } 
        },
        password:{
            message: "Password is required",
            isValid: formData.password.length>0,
            onError: ()=>{
                setError((error) => ({...error, password:true}))
            }
        }, 
        confirmPassword:{
            message: "Passwords do not match",
            isValid: formData.password === formData.confirmPassword,
            onError: ()=>{
                setError((error) => ({...error, confirmPassword:true}))
            }
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        Object.keys(errorMessages).map((key) => {
            
            if(!errorMessages[key].isValid) {
                errorMessages[key].onError()
            }
        })
        console.log("Error List: ", error)
    }

    return(
        <div style={{flexDirection: 'row', display: 'flex'}}>
            <div style={{ width: '50vw', height: '100vh'}}>
                <p>Create an account</p>
                <p>Your personal job finder</p>
                <Form
                    formFields={formFields}
                    error={error}
                    errorMessages={errorMessages}
                    onSubmit={onSubmit}
                />
                <p>By creating an account, I agree to our terms of use and privacy policy</p>
                <p>Already have an account? <b><u>Sign in</u></b></p>
            </div>
            <img src={jobImage} alt="Image" style={{ width: '50vw', height: '100vh' }}/>
        </div>
    )
}