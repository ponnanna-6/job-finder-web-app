import { useRef } from "react";
import styles from './filter.module.css'
import { CiSearch } from "react-icons/ci";

export default function FilterComponent({}) {
    const inputRef = useRef(null)
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
                <button className={styles.applyFilterButton}>Apply Filter</button>
                <label className={styles.clearButton}>Clear</label>
            </div>
        </div>
    );
}