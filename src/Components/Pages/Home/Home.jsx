import { v4 as uuidv4 } from 'uuid'
import {useEffect, useState} from 'react';
import styles from './home.module.css'
import Modal from 'react-modal'
import axios from 'axios'

const Home = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [selectedPizza, setSelectedPizza] = useState(null)
  const [data, setData] = useState([])
  const [counter, setCounter] = useState (1)
  const [finalPrice, setFinalPrice] = useState (0)

  useEffect(() =>{
    axios.get('http://localhost:3000/pizzas')
      .then((response) => {
        setData(response.data)
      })
      .catch(error => console.error('Erro ao buscar os dados', error))
},[])

  function openModal(pizza){
    setSelectedPizza(pizza)
    setIsOpen(true)
  }

  function closeModal(){
    setIsOpen(false)
    setSelectedPizza(null)
    setCounter(1)
  }


  function increase(){
    setCounter(counter + 1)
  }

  function decrease(){
    if(counter > 1){
      setCounter(counter - 1)
    }else{
      alert('Valor mínimo do pedido é 1')
    }
  }

  useEffect(() =>{
    if(selectedPizza){
      setFinalPrice(parseFloat(selectedPizza.price.replace(",",".")) * counter)
      console.log(finalPrice)
    }
  }, [counter, selectedPizza])

  function addToCart(event){
    event.preventDefault()

    const quantity = event.target.quantity.value
    const observation = event.target.observation.value
    const extra = event.target.modalExtraItemsRadio.value

    const pizzaToAdd = {
      ...selectedPizza,
      cartId: uuidv4(),
      quantity,
      observation,
      extra,
      finalPrice
    }

    axios.post('http://localhost:3000/cart', pizzaToAdd)
    .then((response) => {
      console.log('Pizza adicionada:', response.data)
      closeModal()
      setCartUpdated(!cartUpdated)
    })
    .catch(error => console.error('Erro ao adicionar pizza:', error))
  }

  return (
    <div className={styles.menuContainer}>
        {data.map((data =>(
          <div className={styles.pizzaContainer} key={data.id} onClick={() => openModal(data)}>
              <div className={styles.pizzaContent}>
                <div className={styles.pizzaTitle}>
                  <h2 className={styles.title}>{data.title}</h2>
                </div>
                <div className={styles.pizzaContent}>
                  <p className={styles.description}>{data.description}</p>
                </div>
                <div className={styles.pizzaPrice}>
                  <h3 className={styles.price}>R${data.price}</h3>
                </div>
              </div>
              <div className={styles.pizzaImg}>
                <img className={styles.coverImg} src={data.coverImg}/>
              </div>
          </div>
        )))}
  
        {selectedPizza && (
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
            <div className={styles.modalBtn}>
              <button className={styles.modalCloseBtn} onClick={closeModal}>X</button>
            </div>
            <div className={styles.modalPizzaContent}>
              <div className={styles.modalPizzaImg}>
                <img className={styles.coverImg} src={selectedPizza.coverImg} alt={selectedPizza.title} />
              </div>
              <div className={styles.modalPizzaTittle}>
                <h2 className={styles.modalTitle}>{selectedPizza.title}</h2>
              </div>
              <div className={styles.modalPizzaDescription}>
                <p className={styles.modalDescription}>{selectedPizza.description}</p>
              </div>
              <div className={styles.modalPizzaDescription}>
                <h3 className={styles.modalPrice}>R${selectedPizza.price}</h3>
              </div>
              <form onSubmit={addToCart}>
                <div className={styles.modalExtraItems}>
                <input type="radio" className={styles.modalExtraItemsRadio} name="modalExtraItemsRadio" id="sem-borda" value='sem-borda' required/>
                  <label htmlFor="sem-borda">Sem Borda</label>
                  <input type="radio" className={styles.modalExtraItemsRadio} name="modalExtraItemsRadio" id="borda-catupiry" value='borda-de-catupiry'/>
                  <label htmlFor="borda-catupiry">Borda recheada com catupiry</label>
                </div>
                <div className={styles.modalObsContainer}>
                  <label htmlFor="observation">Alguma observação?</label>
                  <input type="textarea" className={styles.modalObsContent} id='observation'/>
                </div>
                <div className={styles.modalCartBtnContainer}>
                  <button type="button" className={styles.modalCartBtnContent} onClick={decrease}>-</button>
                  <input type="number" className={styles.quantity} id='quantity' value={counter} onChange={(e) => setCounter(Number(e.target.value))}/>
                  <button type="button" className={styles.modalCartBtnContent} onClick={increase}>+</button>
                  <button type="submit" className={styles.modalCartBtnContent} onChange={(e) => setFinalPrice(Number(e.target.value))}>Adicionar ao Carrinho R${finalPrice.toFixed(2).replace(".",",")}</button>
                </div>
              </form>
            </div>
          </Modal>
        )
      }
    </div>
  )
}
  
export default Home