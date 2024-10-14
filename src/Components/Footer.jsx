import {Link} from 'react-router-dom'
import styles from './footer.module.css'
import SVGHome from './SVGs/SVGHome'
import SVGOrders from './SVGs/SVGOrders'
import SVGPromotions from './SVGs/SVGPromotions'
import SVGProfile from './SVGs/SVGProfile'
import SVGCart from './SVGs/SVGCart'
import { useState, useEffect } from 'react'
import axios from 'axios'


const Footer = ({cartUpdated}) => { 
  const [data, setData] = useState([])

    return (
      <div className={styles.menu}>
        <div className={styles.menuContainer}>
          <Link className={styles.menuContent} to='/'>
            <SVGHome/>
            Início
          </Link>
        </div>
        <div className={styles.menuContainer}>
          <Link className={styles.menuContent} to='/cart'>
            <SVGCart />
            Carrinho</Link>
        </div>
        <div className={styles.menuContainer}>
          <Link className={styles.menuContent} to='/orders'>
            <SVGOrders />
            Pedidos
          </Link>
        </div>
        <div className={styles.menuContainer}>
          <Link className={styles.menuContent} to='/promotions'>
            <SVGPromotions />
            Promoções</Link>
        </div>
        <div className={styles.menuContainer}>
          <Link className={styles.menuContent} to='/account'>
            <SVGProfile />
            Perfil</Link>
        </div>
        <div className={styles.loginContainer}>
          <Link className={styles.login} to='/login'>Login</Link>
        </div>
      </div>
    )
  }
  
  export default Footer