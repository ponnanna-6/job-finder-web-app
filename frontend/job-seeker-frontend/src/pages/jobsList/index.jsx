import Header from "../../components/header";
import JobItem from "../../components/jobItem";
import { tokenAvailable } from "../../helper";
import { getAllJobData } from "../../services/jobs";
import { useState, useEffect} from "react"
import { useNavigate} from "react-router-dom"

export default function JobsList(){
    const navigate = useNavigate()
    const [jobData, setJobData] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async() => {
            await getAllJobData().then(res => {
                setJobData(res)
                setLoading(false)
            });
        }
        getData()
    }, []);

    const handleLogout = () => {
        navigate('/login')
        localStorage.removeItem('token')
    }

    return(
        loading 
            ? (<p> Loading... </p>)
            : (<> 
                <Header 
                    isLogged={tokenAvailable()}
                    handleLogout={handleLogout}
                    handleLogin={()=>{navigate('/login')}}
                    handleRegister={()=>{navigate('/register')}}
                />
                <div>Filter component</div>
                <div>
                    {Object.keys(jobData).map((index, key) => {
                        return <JobItem key={index} data={jobData[key]}/>
                    })}
                </div>
            </>)
        
    )
}