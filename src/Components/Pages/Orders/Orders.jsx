import { useEffect, useState } from "react"
import axios from 'axios'
import styles from './orders.module.css'


const Orders = () => {
    const [data, setData] = useState([])

    useEffect(() =>{
        axios.get('http://localhost:3000/orders')
            .then((response) =>{
                setData(response.data)
                console.log('Dados retornados:', response.data)
            })
            .catch(error => console.log('Erro ao buscar os dados', error))
    },[])
    
    return (
      <div>
        {data.map((item =>(
            <div className={styles.pizzaOrder} key={item.cartId}>
                <div className={styles.pizzaContent}>
                    <div className={styles.pizzaTitle}>
                      <h2 className={styles.title}>{item.title}</h2>
                    </div>
                    <div className={styles.pizzaContent}>
                      <p className={styles.description}>{item.description}</p>
                    </div>
                    <div className={styles.pizzaPrice}>
                      <h3 className={styles.price}>R${item.price}</h3>
                    </div>
                    <div className={styles.pizzaImg}>
                        <img className={styles.coverImg} src={item.coverImg}/>
                    </div>
                </div>
                <div className={styles.adressContent} key={item.cartId}>
                    <div className={styles.adressContent}>
                      <p className={styles.street}>{item.street}</p>
                    </div>
                    <div className={styles.adressContent}>
                      <p className={styles.number}>{item.number}</p>
                    </div>
                    <div className={styles.adressContent}>
                      <p className={styles.complement}>{item.complement}</p>
                    </div>
                    <div className={styles.adressContent}>
                      <p className={styles.cep}>{item.cep}</p>
                    </div>
                    <div className={styles.adressContent}>
                      <p className={styles.neighborhood}>{item.neighborhood}</p>
                    </div>
                    <div className={styles.adressContent}>
                      <p className={styles.cellphone}>{item.cellphone}</p>
                    </div>
                    <div className={styles.adressContent}>
                      <p className={styles.pickUp}>{item.pickUp}</p>
                    </div>   
                </div>
            </div>
        )
        ))}
    </div>
    )
}

export default Orders