import styles from './index.module.css'
import shape1 from '../assets/shape1.png';
import shape2 from '../assets/shape2.png';

export default function Header({isLogged, handleLogout, handleLogin, handleRegister})  {
    return (
    <div className={styles.header}>
        <img src={shape1} alt="shape1" className={styles.shape1} />
        <img src={shape2} alt="shape2" className={styles.shape2} />
        <h3>Jobfinder</h3>
        {isLogged
            ? <div className={styles.btnGroup}>
                <button className={styles.login} onClick={handleLogout}>Logout</button>
                <button className={styles.register}>User</button>
            </div>
            : <div className={styles.btnGroup}>
                <button className={styles.login} onClick={handleLogin}>Login</button>
                <button className={styles.register} onClick={handleRegister}>Register</button>
            </div>
        }
    </div>
    )
}