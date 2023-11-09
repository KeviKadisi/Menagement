import classes from "./Navbar.module.css";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.container}>
        <Link className={classes.brand} to="/">
          Auto-Management
        </Link>
        <Link className={classes.cars} to="/cars">
          Cars
        </Link>
        <Link className={classes.cars} to="/motorcycles">
          Motorcycles
        </Link>
        <Link className={classes.cars} to="/cart">
          Cart
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
