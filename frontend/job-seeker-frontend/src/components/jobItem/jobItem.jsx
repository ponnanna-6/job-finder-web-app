import { useEffect } from "react";
import { isEditable, tokenAvailable } from "../../helper"
import styles from './jobItem.module.css'
import { useNavigate} from "react-router";

export default function JobItem({data}) {
    const navigate = useNavigate()
    const onViewClick = () => {
        if(tokenAvailable()) {    
            navigate(`/list/${data?._id}`)
        } else {
            navigate(`/login`)
        }
    }

    const onEditClick = () => {
        if(tokenAvailable()) {    
            navigate(`/editjob/${data?._id}`)
        }
    }
    return (
        <div className={styles.container}>
            <img className={styles.logo} src={data?.logo} alt={data?.name}/>
            <div className={styles.rightSide}>
                <p className={styles.position}>{data?.position}</p>
                <p className={styles.salary}>$ {data?.salary}</p>
                <div className={styles.rowItems}>
                    <p className={styles.jobType}>{data?.jobType}</p>
                    <p className={styles.remote}>{data?.remote ? "remote" : "on-site"}</p>
                </div>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.skills}>
                    {data?.skills.map((skill, index) => {
                        return <p key={index}className={styles.skill}>{skill}</p>
                    })}
                </div>
                <div className={styles.buttonContainer}>
                    {isEditable(data?.creator) && <button className={styles.editButton} onClick={onEditClick}>Edit Job</button>}
                    <button className={styles.viewButton} onClick={onViewClick}>View Details</button>
                </div>
            </div>
        </div>
    );
}