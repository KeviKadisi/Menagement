import React from "react";
import { useEffect, useState } from "react";
import Container from "../components/layouts/Container";
import NewCard from "../components/ui/NewCard";
import Motorfilter from "../components/filters/Motorfilter";

const Motorcycles = () =>{
  const [motorcycles, setMotorcycles]= useState([]);
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
            setMotorcycles(carsArray);
          });
      }, []);
  
    return (
        <>
         <Motorfilter setMotorcycles={setMotorcycles} />
         <Container>
        {motorcycles.map((mot) => (
          <NewCard
            key={mot.id}
            id={mot.id}
            brand={mot.brand}
            image={mot.image}
            model={mot.model}
            description={mot.description}
            year={mot.year}
            price={mot.price}
          />
        ))}
      </Container>
        </>
    );
};

export default Motorcycles;