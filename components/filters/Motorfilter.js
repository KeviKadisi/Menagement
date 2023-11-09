import React, {useRef} from "react";
import classes from "./Motorfilter.module.css";


const Motorfilter = (props) =>{

    const brandRef= useRef();
    const modelRef= useRef();
    const yearRef= useRef();


    const filterHandler= (e) =>{
        const brandFilter= brandRef.current.value;
        const modelFilter= modelRef.current.value;
        const yearFilter= yearRef.current.value;


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
              let filteredCars = Object.keys(carsData).map((key) => ({
                id: key,
                ...carsData[key],
              }));
      
              if (brandFilter) {
                filteredCars = filteredCars.filter(
                  (moto) => moto.brand === brandFilter
                );
              }
              if (yearFilter) {
                filteredCars = filteredCars.filter((moto) => moto.year == yearFilter);
              }
              if (modelFilter) {
                filteredCars = filteredCars.filter(
                  (moto) => moto.model === modelFilter
                );
              }
      
              props.setMotorcycles(filteredCars);
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
            onChange={filterHandler}
          >
            <option value="" defaultValue>
              Motor
            </option>
            <option value="Suzuki">Suzuki</option>
            <option value="Harley-Davidson">Harley-Davidson</option>
            <option value="Bmw">Bmw</option>
            <option value="Honda">Honda</option>
            <option value="Ducati">Ducati</option>
            <option value="Kawasaki">Kawasaki</option>
            <option value="Moto Guzzi ">Moto Guzzi </option>
            <option value="MV Agusta">MV Agusta</option>
          </select>
        </div>

        <div>
          <select
            ref={yearRef}
            name="year"
            id="year"
            onChange={filterHandler}
          >
            <option value="" defaultValue>
              Year
            </option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        </div>

        <div>
          <select
            ref={modelRef}
            name="model"
            id="model"
            onChange={filterHandler}
          >
            <option value="" defaultValue>
              Model
            </option>
            <option value="Hayabusa">Hayabusa</option>
            <option value="Sportster">Sportster</option>
            <option value="s1000rr">s1000rr</option>
            <option value="CB 500 X">CB 500 X</option>
            <option value="Monster">Monster</option>
            <option value="Ninja ZX-10R ">Ninja ZX-10R </option>
            <option value="v9">v9</option>
            <option value="F4">F4</option>
          </select>
        </div>
      </div>
        </>
    );
};

export default Motorfilter;