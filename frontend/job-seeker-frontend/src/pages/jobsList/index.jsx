import Header from "../../components/header/header";
import JobItem from "../../components/jobItem/jobItem";
import { tokenAvailable } from "../../helper";
import { getAllJobData } from "../../services/jobs";
import { useState, useEffect} from "react"
import { useNavigate} from "react-router-dom"
import styles from "./index.module.css"
import FilterComponent from "../../components/filter/filter";

export default function JobsList(){
    const navigate = useNavigate()
    const [jobData, setJobData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [clear, setClear] = useState(false)

    useEffect(() => {
        getData()
    }, []);

    useEffect(() => {
        if(clear) {  
            getData()
            setClear(false)
        }
    }, [clear]);

    
    const getData = async() => {
        await getAllJobData().then(res => {
            setJobData(res)
            setLoading(false)
        });
    }

    const handleLogout = () => {
        navigate('/login')
        localStorage.removeItem('token')
    }

    return(
        loading 
            ? (<p> Loading... </p>)
            : (
                <div className={styles.container}>
                    <Header 
                        isLogged={tokenAvailable()}
                        handleLogout={handleLogout}
                        handleLogin={()=>{navigate('/login')}}
                        handleRegister={()=>{navigate('/register')}}
                    />
                    <div className={styles.filterParent}>
                        <FilterComponent 
                            setJobData={setJobData}
                            setLoading={setLoading}
                            setClear={setClear}
                        />
                    </div>
                    <div className={styles.parent}>
                        {Object.keys(jobData).map((index, key) => {
                            return <JobItem key={index} data={jobData[key]}/>
                        })}
                    </div>
                </div>
            )
    )
}