import PropTypes from "prop-types";

import s from "./CarCard.module.css";

const CarCard = ({ car, onLearnMore }) => {
  return (
    <div className={s.carCard}>
      <img
        src={car.img}
        alt={`${car.make} ${car.model}`}
        className={s.carImage}
      />
      <div className={s.carDetails}>
        <h2>
          {car.make} {car.model}, {car.year}
        </h2>
        <p className={s.carPrice}>{car.rentalPrice}</p>
        <ul>
          <li>{car.address.split(", ")[car.address.split(", ").length - 2]}</li>
          <li>{car.address.split(", ").pop()}</li>
          <li>{car.rentalCompany}</li>
          <li>{car.accessories[2].split(" ")[0]}</li>
          <li>{car.type}</li>
          <li>{car.model}</li>
          <li>{car.id}</li>
          <li>{car.functionalities[0]}</li>
        </ul>
        <button className={s.button} onClick={onLearnMore}>
          Learn more
        </button>
      </div>
    </div>
  );
};

CarCard.propTypes = {
  car: PropTypes.object.isRequired,
  onLearnMore: PropTypes.func.isRequired,
};

export default CarCard;
