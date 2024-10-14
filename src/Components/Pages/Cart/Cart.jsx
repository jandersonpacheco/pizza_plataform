import axios from "axios"
import { useEffect, useState } from "react"
import styles from "../Home/home.module.css"

const Cart = () => {
    const [data, setData] = useState([])

    function removeFromCart(id){
        axios.delete(`http://localhost:3000/cart/${id}`)
        .then(() =>{
            setData(prevData => prevData.filter(item => item.cartId !== id))
            console.log('Exclusão efetuada.')
        })
        .catch(error => console.error('Erro ao deletar os dados', error))
    }
    
    useEffect(() => {
        axios.get('http://localhost:3000/cart')
            .then((response) => {
                setData(response.data)
            })
            .catch(error => console.error('Erro ao buscar os dados do carrinho:', error))
        }, [])

    return (
        <div>
            {data.map((data =>(
                <div className={styles.pizzaContainer} key={data.id}>
                    <div className={styles.pizzaContent}>
                        <div className={styles.pizzaTitle}>
                            <h2 className={styles.title}>{data.title}</h2>
                        </div>
                        <div className={styles.pizzaContent}>
                            <p className={styles.description}>{data.description}</p>
                        </div>
                        <div className={styles.pizzaPrice}>
                            <h3 className={styles.price}>{data.price}</h3>
                        </div>
                    </div>
                    <div className={styles.pizzaImg}>
                        <img className={styles.coverImg} src={data.coverImg}/>
                    </div>
                    <div className={styles.removebtnContainer}>
                        <button className={styles.removeBtn} onClick={() => removeFromCart(data.id)}>Remover do Carrinho</button>
                    </div>
                </div>
            )))}
        </div>
    )
}

export default Cart