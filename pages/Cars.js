import { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Carfilter from "../components/filters/Carfilter";
import Container from "../components/layouts/Container";
import React from "react";
const Cars = () => {
  const [cars, setCars] = useState([]);
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
        const carsArray = Object.keys(carsData).map((key) => ({
          id: key,
          ...carsData[key],
        }));
        setCars(carsArray);
      });
  }, []);

  return (
    <>
      <Carfilter setCars={setCars} />
      <Container>
        {cars.map((car) => (
          <Card
            key={car.id}
            id={car.id}
            brand={car.brand}
            image={car.image}
            model={car.model}
            description={car.description}
            year={car.year}
            price={car.price}
          />
        ))}
      </Container>
    </>
  );
};

export default Cars;
