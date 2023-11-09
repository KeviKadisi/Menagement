import React from "react";
import { useEffect, useContext, useState } from "react";
import { useParams} from "react-router-dom";
import CartContext from "../store/CartContext";
import classes from "./Motorcycle.module.css";
const Motorcycle = () =>{
 const {motoId}= useParams();

 const [motor, setMotor]= useState([]);
 const cartCtx= useContext(CartContext);
 useEffect(() => {
    fetch(
    `https://car-management-5e8a2-default-rtdb.europe-west1.firebasedatabase.app/motorcycles/${motoId}.json`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((carData) => {
       
        setMotor(carData);
            
        
      });
  }, [motoId]);

  const handleAddToCart = () =>{
    cartCtx.addToCart(motoId);
  };


  const handleRemoveFromCart = () =>{
    cartCtx.removeFromCart(motoId);
  };



    return (
        <>
         <div className={classes.container}>
      <img className={classes.image} src={motor.image} />
      <h1 className={classes.title}>
        {motor.brand} {motor.model}
      </h1>
      <p className={classes.year}>{motor.year}</p>
      <p className={classes.description}>{motor.description}</p>
      <p className={classes.price}>{motor.price}$</p>
      {cartCtx.isOnCart(motoId) ? (
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
export default Motorcycle;