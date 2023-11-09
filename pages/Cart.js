import  { useContext, useEffect, useState } from "react";
import CartContext from "../store/CartContext";
import Container from "../components/layouts/Container";
import classes from "./cart.module.css";
import Checkout from "./Checkout";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
const Cart = () => {
  const cartCtx = useContext(CartContext);
  const [cars, setCars] = useState([]);
  const [total, setTotal] = useState(0);
 const [tatol, setTatol]= useState(0);
  const [moto, setMoto] = useState([]);
  const [isSubmitting, setIsSubmitting]=useState(false);
  const [didSubmit, setDidSubmit]=useState(false);
  const [isCheckout , setIsCheckout]=useState(false);
  useEffect(() => {
    fetch(
      "https://car-management-5e8a2-default-rtdb.europe-west1.firebasedatabase.app/cars.json"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((carsData) => {
        const carsArray = Object.keys(carsData).map((key) => {
          return {
            id: key,
            ...carsData[key],
          };
        });


        const selectedCars = carsArray.filter((car) =>
          cartCtx.cart.includes(car.id)
        );

        let sum = 0;
        selectedCars.forEach((selectedCar) => {
          sum += parseInt(selectedCar.price);
        });
        setTotal(sum);

        setCars(selectedCars);
      });
  }, []);


  useEffect(() => {
    fetch(
      "https://car-management-5e8a2-default-rtdb.europe-west1.firebasedatabase.app/motorcycles.json"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((carsData) => {
        const carsArray = Object.keys(carsData).map((key) => {
          return {
            id: key,
            ...carsData[key],
          };
        });
        

        const selectedCars = carsArray.filter((car) =>
          cartCtx.cart.includes(car.id)
        );

        let sum = 0;
        selectedCars.forEach((selectedCar) => {
          sum += parseInt(selectedCar.price);
        });
        setTatol(sum);

        setMoto(selectedCars);
      });
  }, []);

  const submitOrderHandler = async (userData)=>{
    setIsSubmitting(true);
 await fetch('https://car-management-5e8a2-default-rtdb.europe-west1.firebasedatabase.app/order.json', {
    method: "POST",
    body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.cart
    })  
});
setIsSubmitting(false);
setDidSubmit(true);
cartCtx.clearCart();
};

  const sum= total+ tatol;
  const hasItems= cartCtx.cart.length > 0;

  const cartHandler= ()=>{
   setIsCheckout(true);
  };
  
  const orderHandler= ()=>{
    setIsCheckout(false);
   };

  const modalAction=(   <div className={classes.actions} >
   
    {hasItems && <button className={classes.button} onClick={cartHandler} >Order</button>}
</div>);

 const cartModalContent= <React.Fragment>
  <h2 className={classes.total}>Total Price: {sum}$</h2>
 
 { isCheckout && <Checkout onConfirm={submitOrderHandler} onClose={orderHandler}/>}
 {!isCheckout && modalAction}
 </React.Fragment>

const isSubmittingModalContent = <p>Sending order data ...</p>;
const didSubmitModelContent= <React.Fragment><p>Successfully send the order!</p>
  <div className={classes.actions} >
      <span> <FontAwesomeIcon icon={faCheckCircle} /></span>
    </div>
</React.Fragment> 

  
 
  return (
    <Container>
      {cars.map((car) => (
        <div key={car.id} className={classes.cartItem}>
          <div>
            <img className={classes.image} src={car.image} />
            <div className={classes.info}>
              <h2 className={classes.title}>
                {car.brand} {car.model}
              </h2>
              <p className={classes.year}>{car.year}</p>
              <p className={classes.description}>{car.description}</p>
            </div>
          </div>
          <div className={classes.price}>{car.price}$</div>
        </div>
      ))}
      


      {moto.map((car) => (
        <div key={car.id} className={classes.cartItem}>
          <div>
            <img className={classes.image} src={car.image} />
            <div className={classes.info}>
              <h2 className={classes.title}>
                {car.brand} {car.model}
              </h2>
              <p className={classes.year}>{car.year}</p>
              <p className={classes.description}>{car.description}</p>
            </div>
          </div>
          <div className={classes.price}>{car.price}$</div>
        </div>
      ))}
       {!isSubmitting && !didSubmit && cartModalContent}
     {isSubmitting && isSubmittingModalContent}
     {!isSubmitting &&  didSubmit && didSubmitModelContent}
     
    </Container>
  );
};

export default Cart;
