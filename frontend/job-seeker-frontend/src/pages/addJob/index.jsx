import { useState } from "react"
import Form from "../../components/form/form"
import addJobImage from "../../assets/add_job_image.png"
import { useNavigate} from "react-router-dom"
import styles from "./addJob.module.css"
import { addJob, editJob } from "../../services/jobs"

export default function AddJob({id, edit, data}){
    const navigate = useNavigate()
    const [formData, setFormData] = useState(!edit ? {
        name: "",
        logo: "",
        position: "",
        salary: "",
        jobType: "",
        remote: "",
        description: "",
        about: "",
        skills: [],
        information: "",
        creator: "",
    }: {...data, skills: Object.values(data.skills)})

    const [error, setError] = useState({
        name: false,
        logo: false,
        position: false,
        salary: false,
        jobType: false,
        remote: false,
        description: false,
        about: false,
        skills: false,
        information: false,
        creator: false,
    })

    const errorMessages = {
        name: {
            message: "Enter company name",
            isValid: formData.name.length > 0,
            onError: () => {
                setError((error)=>({...error, name: true}))
            }
        }, 
        logo: {
            message: "Please enter company logo",
            isValid: formData.logo.length > 0,
            onError: () => {
                setError((error)=>({...error, logo: true}))
            }
        },
        position: {
            message: "Please enter position",
            isValid: formData.position.length > 0,
            onError: () => {
                setError((error)=>({...error, position: true}))
            }
        },
        salary: {
            message: "Please enter salary",
            isValid: formData.salary.length > 0,
            onError: () => {
                setError((error)=>({...error, salary: true}))
            }
        },
        jobType: {
            message: "Please select Job Type",
            isValid: formData.jobType.length > 0,
            onError: () => {
                setError((error)=>({...error, jobType: true}))
            }
        },
        remote: {
            message: "Please select remote/office",
            isValid: formData.remote.length > 0,
            onError: () => {
                setError((error)=>({...error, remote: true}))
            }
        },
        about: {
            message: "Please enter company details",
            isValid: formData.about.length > 0,
            onError: () => {
                setError((error)=>({...error, about: true}))
            }
        },
        description: {
            message: "Please enter job description",
            isValid: formData.description.length > 0,
            onError: () => {
                setError((error)=>({...error, description: true}))
            }
        },
        skills: {
            message: "Please enter required skills",
            isValid: formData.skills.length > 0,
            onError: () => {
                setError((error)=>({...error, skills: true}))
            }
        },
        information: {
            message: "Please enter more information",
            isValid: formData.information.length > 0,
            onError: () => {
                setError((error)=>({...error, information: true}))
            }
        },
    }

    const formFields = [
        {
            name: "name",
            type: "text",
            placeholder: "Enter your company name here",
            value: formData.name,
            label: "Company Name",
            onChange: (e) => {
                setFormData({...formData, name: e.target.value})
                setError((error)=>({...error, name: false}))
            }
        },
        {
            name: "logo",
            type: "text",
            placeholder: "Enter your company logo link",
            value: formData.logo,
            label: "Add logo URL",
            onChange: (e) => {
                setFormData({...formData, logo: e.target.value})
                setError((error)=>({...error, logo: false}))
            }
        },
        {
            name: "position",
            type: "text",
            placeholder: "Enter job position",
            value: formData.position,
            label: "Job position",
            onChange: (e) => {
                setFormData({...formData, position: e.target.value})
                setError((error)=>({...error, position: false}))
            }
        },
        {
            name: "salary",
            type: "text",
            placeholder: "Enter amount in rupees",
            value: formData.salary,
            label: "Annual salary",
            onChange: (e) => {
                setFormData({...formData, salary: e.target.value})
                setError((error)=>({...error, salary: false}))
            }
        },
        {
            name: "jobType",
            type: "dropdown",
            placeholder: "Select",
            options: ["Internship", "Full-Time", "Part-Time"],
            value: formData.jobType,
            label: "Job Type",
            onChange: (e) => {
                setFormData({...formData, jobType: e.target.value})
                setError((error)=>({...error, jobType: false}))
            }
        },
        {
            name: "remote",
            type: "dropdown",
            placeholder: "Select",
            options: ["Remote", "Office"],
            value: formData.remote,
            label: "Remote/Office",
            onChange: (e) => {
                setFormData({...formData, remote: e.target.value})
                setError((error)=>({...error, remote: false}))
            }
        },
        {
            name: "about",
            type: "textArea",
            placeholder: "Type about comapny ",
            value: formData.about,
            label: "About Company",
            onChange: (e) => {
                setFormData({...formData, about: e.target.value})
                setError((error)=>({...error, about: false}))
            }
        },
        {
            name: "description",
            type: "textArea",
            placeholder: "Type about the Job ",
            value: formData.description,
            label: "Job Description",
            onChange: (e) => {
                setFormData({...formData, description: e.target.value})
                setError((error)=>({...error, description: false}))
            }
        },
        {
            name: "skills",
            type: "skills",
            placeholder: "Enter required skills ",
            value: formData.skills,
            label: "Skills required",
            onChange: (e) => {
                setFormData({...formData, skills: e})
                setError((error)=>({...error, skills: false}))
            }
        },
        {
            name: "information",
            type: "text",
            placeholder: "Enter more information",
            value: formData.information,
            label: "Information",
            onChange: (e) => {
                setFormData({...formData, information: e.target.value})
                setError((error)=>({...error, information: false}))
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
            let jobData = formData
            jobData.remote = jobData.remote == "Remote" ? true : false
            console.log(jobData)
            let res;
            if(edit) {
                res = await editJob(id, jobData)
            } else {
                res = await addJob(jobData)
            }
            
            if(res.status == 200) {
                alert(res.data.message)
                navigate('/')
            } else{
                alert(res.message)
            }
        } else {
            console.log(error)
        }
    }

    const onCancel = async(e) => {
        e.preventDefault()
        navigate('/')
    }

    return(
        <div className={styles.container}>
            <div className={styles.container1}>
                <p className={styles.heading}>Add job description</p>
                <Form
                    formFields={formFields}
                    error={error}
                    errorMessages={errorMessages}
                    onSubmit={onSubmit}
                    submitButton={"Add Job"}
                    cancelButton={"Cancel"}
                    onCancel = {onCancel}
                />
            </div>
            <div className={styles.container2}>
                <p className={styles.imageTextStyle}>Recruiter add job details here</p>
                <img src={addJobImage} alt="Image" className={styles.imageStyle}/>
            </div>
        </div>
    )
}