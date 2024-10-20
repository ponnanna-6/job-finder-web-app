import { useEffect, useState } from "react";
import AddJob from "../addJob";
import { getJobById } from "../../services/jobs";
import { useParams } from "react-router";

export default function EditJob(){
    const params = useParams()
    const [jobData, setJobData] = useState({})
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {   
            setLoading(true);
            setError(false);
            try {
                const res = await getJobById(params.id);
                setJobData(res);
            } catch (error) {
                console.error("Error fetching job data:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        getData()
    },[params.id])

    useEffect(() => {
        console.log(jobData)
    }, [jobData])

    return(
        loading 
            ? <p>...Loading</p>
            : error
                ? <p>Something went wrong try again...</p>
                :
                    <AddJob
                        id= {params?.id}
                        edit = {true}
                        data = {jobData}
                    />
    )
}