import JobItem from "../../components/jobItem";
import { getAllJobData } from "../../services/jobs";
import { useState, useEffect} from "react"

export default function JobsList(){
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

    return(
        loading 
            ? (<p> Loading... </p>)
            : (<> 
                <div>Header</div>
                <div>Filter component</div>
                <div>
                    {Object.keys(jobData).map((index, key) => {
                        return <JobItem key={index} data={jobData[key]}/>
                    })}
                </div>
            </>)
        
    )
}