import React from "react";
import classes from './Footer.module.css';

const Footer =() =>{
 return (
    <div className={classes.footer} >
      <h2>Auto-Management</h2>
       <div  className={classes.one}>
        <span>Luxury</span>
        <span>Elegance</span>
        <span>Modern</span>
        </div>
      
        <p >© Auto-Management </p>
    </div>
 );
};
export default Footer;