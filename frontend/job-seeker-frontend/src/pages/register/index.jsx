import {useState } from "react";
import Form from "../../components/form/form"
import jobImage from "../../assets/job_finder_image.png"
import { registerUser } from "../../services/auth";
import {useNavigate} from "react-router-dom"
import styles from './register.module.css'

export default function Register(){
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        checkBox: false
    })
    const [error, setError] = useState({
        name: false,
        email: false,
        mobile: false,
        password: false,
        confirmPassword: false,
        checkBox: false
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
            name: "mobile",
            type: "tel",
            value: formData.mobile,
            placeholder: "Enter your mobile number",
            onChange: (e) => {
                setFormData({...formData, mobile: e.target.value})
                setError((error) => ({...error, mobile:false}))
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
        },
        {
            name: "checkBox",
            type: "checkbox",
            value: formData.checkBox,
            label: "By creating an account, I agree to our terms of use and privacy policy",
            onChange: (e) => {
                setFormData({...formData, checkBox: e.target.checked})
                setError((error) => ({...error, checkBox:false}))
            }
        },
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
        mobile:{
            message: "Phone number is required",
            isValid: formData.mobile.length>0,
            onError: ()=>{
                setError((error) => ({...error, mobile:true}))
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
        }, 
        checkBox:{
            message: "Need to agree!",
            isValid: formData.checkBox,
            onError: ()=>{
                setError((error) => ({...error, checkBox:true}))
            }
        }
    }

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
            const res = await registerUser({
                name: formData.name,
                email: formData.email,
                mobile: formData.mobile,
                password: formData.password
            })
            if(res.status == 200) {
                alert(res.message)
                navigate('/login')
            } else{
                alert(res.message)
            }
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.container2}>
                <p className={styles.bigTextStyle}>Create an account</p>
                <p className={styles.mediumTextStyle}>Your personal job finder</p>
                <div className={styles.formDiv}>
                    <Form
                        formFields={formFields}
                        error={error}
                        errorMessages={errorMessages}
                        onSubmit={onSubmit}
                        submitButton={"Register"}
                    />
                    <p className={styles.mediumTextStyle}>
                        Already have an account?&nbsp;
                        <b><u onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>
                            Sign in
                        </u></b>
                    </p>
                </div>
            </div>
            <img src={jobImage} alt="Image" className={styles.imageStyle}/>
        </div>
    )
}