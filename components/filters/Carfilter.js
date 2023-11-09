import React, { useRef } from "react";
import classes from "./Carfilter.module.css";

const Carfilter = (props) => {
  const brandRef = useRef();
  const modelRef = useRef();
  const yearRef = useRef();

  const brandFilterHandler = (e) => {
    const brandFilter = brandRef.current.value;
    const yearFilter = yearRef.current.value;
    const modelFilter = modelRef.current.value;

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
        let filteredCars = Object.keys(carsData).map((key) => ({
          id: key,
          ...carsData[key],
        }));

        if (brandFilter) {
          filteredCars = filteredCars.filter(
            (car) => car.brand === brandFilter
          );
        }
        if (yearFilter) {
          filteredCars = filteredCars.filter((car) => car.year == yearFilter);
        }
        if (modelFilter) {
          filteredCars = filteredCars.filter(
            (car) => car.model === modelFilter
          );
        }

        props.setCars(filteredCars);
      });
  };

  return (
    <>
      <div className={classes.filters}>
        <div className={classes.carfilter}>
          <select
            ref={brandRef}
            name="brand"
            id="brand"
            onChange={brandFilterHandler}
          >
            <option value="" defaultValue>
              Car
            </option>
            <option value="Mercedes-Benz">Mercedes</option>
            <option value="Audi">Audi</option>
            <option value="Bmw">BWM</option>
            <option value="Range Rover">Range Rover</option>
          </select>
        </div>

        <div>
          <select
            ref={yearRef}
            name="year"
            id="year"
            onChange={brandFilterHandler}
          >
            <option value="" defaultValue>
              Year
            </option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
        </div>

        <div>
          <select
            ref={modelRef}
            name="model"
            id="model"
            onChange={brandFilterHandler}
          >
            <option value="" defaultValue>
              Model
            </option>
            <option value="s-class">S Class</option>
            <option value="g-class">G Class</option>
            <option value="3 Series">3 Series</option>
            <option value="x5">X5</option>
            <option value="a4">A4</option>
            <option value="q5">Q5</option>
            <option value="sport">Sport</option>
            <option value="velar">Velar</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Carfilter;
