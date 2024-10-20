import { useRef, useState } from "react";
import styles from './filter.module.css'
import { CiSearch } from "react-icons/ci";
import { tokenAvailable } from "../../helper";
import { useNavigate } from "react-router";
import { getJobBySearch } from "../../services/jobs";

export default function FilterComponent({setJobData, setLoading, setClear}) {
    const inputRef = useRef(null)
    const navigate = useNavigate()
    const [searchData, setSearchData] = useState("")

    const onAddJobClick = () => {
        navigate('/addJob')
    }

    const applyFilter = async() => {
        setLoading(true)
        try {
            const res = await getJobBySearch(searchData);
            setJobData(res);
        } catch (error) {
            console.error("Error fetching job data:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.searchBarContainer}>
                <CiSearch 
                    className={styles.serachIcon}
                    size={30}
                    onClick={() => {
                        inputRef.current.focus()
                    }}
                />
                <input 
                    type="search"
                    ref={inputRef}
                    className={styles.searchInput}
                    placeholder="Type any job title"
                    onChange={(e) => setSearchData(e.target.value)}
                />
            </div>
            <div className={styles.otherFilters}>
                <select
                    className={styles.dropInput}
                >
                    <option>Vivaan</option>
                    <option>Ponnanna</option>
                    <option>naman</option>
                </select>
                {tokenAvailable() && <button className={styles.addJobButton} onClick={onAddJobClick}>Add Job</button>}
                <button className={styles.applyFilterButton} onClick={applyFilter}>Apply Filter</button>
                <label className={styles.clearButton} onClick={() => {setClear(true)}}>Clear</label>
            </div>
        </div>
    );
}