import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getJobById } from "../../services/jobs"
import styles from "./jobDetail.module.css"
import Header from "../../components/header/header"
import { isEditable, tokenAvailable } from "../../helper"
import { CiMoneyBill } from "react-icons/ci";

export default function JobsDetail(){
    const params = useParams()
    const [jobData, setJobData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {   
            setIsLoading(true);
            setIsError(false);
            try {
                const res = await getJobById(params.id);
                setJobData(res);
            } catch (error) {
                console.error("Error fetching job data:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        getData()
    },[params.id])

    const handleLogout = () => {
        navigate('/login')
        localStorage.removeItem('token')
    }

    return(
        isLoading || isError  
            ? (isError ? <p className={styles.bigTextStyle}>Something went wrong</p>: <p className={styles.bigTextStyle}>...Loading</p>)
            : (<div className={styles.container}>
                    <Header
                        isLogged={tokenAvailable()}
                        handleLogout={handleLogout}
                        handleLogin={()=>{navigate('/login')}}
                        handleRegister={()=>{navigate('/register')}}/>
                    <div className={styles.container2}>
                        <div className={styles.jobDataHeaderContainer}>  
                            <p className={styles.headerTextStyle}>{`${jobData?.position} ${jobData?.remote ? "work from home": "work at office"} ${jobData?.jobType} at ${jobData?.name}`}</p>
                        </div>
                        <div className={styles.jobDataDetailsContainer}>
                            <div className={styles.detailRow1}>
                                <p className={styles.smallTextStyle}>{`1 week ago. ${jobData?.jobType}. ${jobData?.name}`}</p>
                            </div>
                            <div className={styles.detailRow2}>
                                <p className={styles.bigTextStyle}>{`${jobData?.name}`}</p>
                                {isEditable(jobData?.creator) && <button className={styles.editButton}>Edit Job</button>}
                            </div>
                            <div className={styles.detailRow3}>
                                <p className={styles.smallTextStyle} style={{color: "#000000"}}><CiMoneyBill 
                                    size={10}
                                /><span> Salary</span></p>
                                <p className={styles.smallTextStyle}>{`$ ${jobData?.salary}`}</p>
                            </div>
                            <div className={styles.detailRow4} style={{marginTop: "1rem"}}>
                                <p className={styles.mediumTextStyle} style={{color: "#000000"}}>About the Company</p>
                                <p className={styles.mediumTextStyle} style={{fontWeight: 400, color: "#595959"}}>{`${jobData?.about}`}</p>
                            </div>
                            <div className={styles.detailRow4}>
                                <p className={styles.mediumTextStyle} style={{color: "#000000"}}>About the job</p>
                                <p className={styles.mediumTextStyle} style={{fontWeight: 400, color: "#595959"}}>{`${jobData?.description}`}</p>
                            </div>
                            <div className={styles.detailRow4}>
                                <p className={styles.mediumTextStyle} style={{color: "#000000"}}>Skills</p>
                                {jobData?.skills.map(item => 
                                    <p className={styles.skills} style={{fontWeight: 400, color: "#595959"}}>{`${item}`}</p>
                                )}
                            </div>
                            <div className={styles.detailRow4}>
                                <p className={styles.mediumTextStyle} style={{color: "#000000"}}>Additional Information</p>
                                <p className={styles.mediumTextStyle} style={{fontWeight: 400, color: "#595959"}}>{`${jobData?.information}`}</p>
                            </div>
                        </div>
                    </div>
                    
                </div>)
    )
}