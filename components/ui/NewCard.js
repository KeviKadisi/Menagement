import React from "react";
import classes from "./NewCard.module.css";
import { Link } from "react-router-dom";

const NewCard = (props) => {
  const { image, model, description, year, price, brand, id } = props;

  return (
    <div className={classes.car}>
      <Link className={classes.link} key={id} to={`/motorcycles/${id}`}>
        <img className={classes.image} src={image} alt="Benz" />
        <div>
          <h3 className={classes.title}>Brand : {brand}</h3>
          <p className={classes.model}>Model : {model}</p>
          <p className={classes.description}>Info : {description}</p>
          <div className={classes.extraInfo}>
            <p className={classes.year}>Year : {year}</p>
            <p className={classes.price}>Price : {price} $</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewCard;
