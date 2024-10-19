import { useEffect } from "react";
import { isEditable } from "../../helper"
import styles from './jobItem.module.css'

export default function JobItem({data}) {
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
                    {isEditable(data?.creator) && <button className={styles.editButton}>Edit Job</button>}
                    <button className={styles.viewButton}>View Details</button>
                </div>
            </div>
        </div>
    );
}