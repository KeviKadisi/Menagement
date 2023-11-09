import { useState, useEffect } from "react";
import Container from "../components/layouts/Container";
import Card from "../components/ui/Card";
import NewCard from "../components/ui/NewCard";
import React from "react";
const Homepage = (props) => {
  const [cars, setCars] = useState([]);
  const [moto, setMoto] = useState([]);

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
        const carsArray = Object.keys(carsData).map((key) => ({
          id: key,
          ...carsData[key],
        }));
        setMoto(carsArray);
      });
  }, []);
  return (
    <>
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
        {moto.map((moto) => (
          <NewCard
            key={moto.id}
            id={moto.id}
            brand={moto.brand}
            image={moto.image}
            model={moto.model}
            description={moto.description}
            year={moto.year}
            price={moto.price}
          />
        ))}
      </Container>
    </>
  );
};

export default Homepage;
