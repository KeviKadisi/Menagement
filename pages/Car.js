import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import CartContext from "../store/CartContext";
import classes from "./car.module.css";
const Car = () => {
  const { carId } = useParams();
  const cartCtx= useContext(CartContext);

  const [car, setCar] = useState([]);
  useEffect(() => {
    fetch(
    `https://car-management-5e8a2-default-rtdb.europe-west1.firebasedatabase.app/cars/${carId}.json`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((carData) => {
       
        setCar(carData);
            
        
      });
  }, [carId]);
    

  const handleAddToCart = () =>{
    cartCtx.addToCart(carId);
  };


  const handleRemoveFromCart = () =>{
    cartCtx.removeFromCart(carId);
  };



  return (
    <>
     <div className={classes.container}>
      <img className={classes.image} src={car.image} />
      <h1 className={classes.title}>
        {car.brand} {car.model}
      </h1>
      <p className={classes.year}>{car.year}</p>
      <p className={classes.description}>{car.description}</p>
      <p className={classes.price}>{car.price}$</p>
      {cartCtx.isOnCart(carId) ? (
        <div className={classes.buttonRemove} onClick={handleRemoveFromCart}>
          Remove to Cart
        </div>
      ) : (
        <div className={classes.button} onClick={handleAddToCart}>
          Add to Cart
        </div>
      )}
    </div>

    </>
  );
};

export default Car;
