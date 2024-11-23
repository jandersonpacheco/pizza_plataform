import axios from "axios"
import { useEffect, useState } from "react"
import styles from "../Home/home.module.css"
import Modal from 'react-modal'

const Cart = () => {
    const [data, setData] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false)

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
        }, [data])

    function openModal(){
        setIsOpen(true)
    }
    
    function closeModal(){
        setIsOpen(false)
    }

function pickUpOrder(){
        const pickUp = 'Retirada'
        const addOrder = {
            ...data,
            pickUp
        }

        console.log(addOrder)
        axios.post('http://localhost:3000/orders', addOrder)
        .then((response) => {
            console.log('Pedido concluído!', response.data)
            closeModal()
        })
        .catch(error => console.error('Erro ao buscar os dados do carrinho', error))

        data.forEach((item) =>{
            axios.delete(`http://localhost:3000/cart/${item.id}`)
                .then(() => {
                    console.log('Carrinho esvaziado!')
                })
                .catch(error => console.error('Erro ao deletar os dados', error))
                })
    }


        function deliveryOrder(event){

            const street = event.target.street.value
            const number = event.target.number.value
            const complement = event.target.complement.value
            const cep = event.target.cep.value
            const neighborhood = event.target.neighborhood.value
            const cellphone = event.target.cellphone.value
            const addOrder = {
                ...data,
                street,
                number,
                complement,
                cep,
                neighborhood,
                cellphone
            }
            axios.post('http://localhost:3000/orders', addOrder)
                .then((response) => {
                    console.log('Pedido concluído!', response.data)
                    closeModal()
                })
                .catch(error => console.error('Erro ao buscar os dados do carrinho', error))

            data.forEach((item) =>{
                axios.delete(`http://localhost:3000/cart/${item.id}`)
                    .then(() => {
                        console.log('Carrinho esvaziado!')
                    })
                    .catch(error => console.error('Erro ao deletar os dados', error))
            })
        }


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
                            <h3 className={styles.price}>R${data.finalPrice.toFixed(2).replace(".",",")}</h3>
                        </div>
                        <div className={styles.quantity}>
                            <h3 className={styles.quantity}>Quantidade: {data.quantity}</h3>
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
            <div className={styles.purchaseContainer}>
                <button className={styles.purchaseBtn} key={data.id} onClick={() => openModal(data)}>Finalizar Pedido</button> 
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
            <div className={styles.modalBtn}>
                <button className={styles.modalCloseBtn} onClick={closeModal}>X</button>
            </div>
            <div className={styles.pickUpContainer}>
                <p className={styles.pickUp}><strong>Retirar no estabelecimento</strong></p>
                <p className={styles.pickUp}><strong>Rua Germano Gottsfritz, 431 - Jardim Niterói</strong></p>
                <p className={styles.pickUp}>Disponível para retirada em <strong>30-40 min</strong></p>
                <button className={styles.deliveryBtn} onClick={() => pickUpOrder()}>Continuar com Retirada</button>
            </div>
            <div className={styles.deliveryContainer}>
                <form onSubmit={deliveryOrder}>
                    <p className={styles.delivery}>Receba em casa!</p>
                    <label className={styles.adress} htmlFor='street'>*Endereço:</label>
                    <input className={styles.adress} id='street' required></input>
                    <label className={styles.adress} htmlFor='number'>*Nº:</label>
                    <input className={styles.adress} id='number' required></input>
                    <label className={styles.adress} htmlFor='complement'>Complemento:</label>
                    <input className={styles.adress} id='complement'></input>
                    <label className={styles.adress} htmlFor='cep' required>*CEP:</label>
                    <input className={styles.adress} id='cep'></input>
                    <label className={styles.adress} htmlFor='neighborhood'>*Bairro:</label>
                    <input className={styles.adress} id='neighborhood' required></input>
                    <label className={styles.adress} htmlFor='cellphone'>*Celular:</label>
                    <input className={styles.adress} id='cellphone'></input>
                    <button type='submit' className={styles.deliveryBtn}>Continuar com Delivery</button>
                </form>
            </div>
            </Modal>
        </div>
    )
}

export default Cart