import { useEffect, useState } from "react";
import axios from "axios";

const CarCatalog = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("URL_API");
        setCars(response.data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div>
      <h1>Каталог автомобілів</h1>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>{car.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CarCatalog;
