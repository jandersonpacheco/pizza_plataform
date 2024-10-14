import {Link} from 'react-router-dom'
import logo from '../assets/logo.jpg'
import styles from './header.module.css'

const Header = () => {
  console.log(logo)
  return (
    <nav className={styles.nav}>
      <div className={styles.logoContainer}>
        <Link to='/'><img className={styles.logo} src={logo}/></Link>            
      </div>
      <div className={styles.titleContainer}>
        <span className={styles.title}>Chef Pizzaria - Jd Niterói</span>
      </div>
      <div className={styles.contentContainer}>
        <span className={styles.adress}> São Paulo - SP</span>
        <span className={styles.informations}>Clique para mais informações</span>
      </div>
      <div className={styles.containerHours}>
        <span className={styles.openingHours}>Aberto das 17h às 23h</span>
      </div>
    </nav>
    )
  }
  
  export default Header