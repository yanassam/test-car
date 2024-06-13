import Modal from "react-modal";
import PropTypes from "prop-types";
import s from "./CarModal.module.css";

Modal.setAppElement("#root");

const CarModal = ({ isOpen, onClose, car }) => {
  if (!car) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={s.modal}
      overlayClassName={s.overlay}
    >
      <div className={s.modalContent}>
        <button onClick={onClose} className={s.closeButton}>
          &times;
        </button>
        <img
          src={car.img}
          alt={`${car.make} ${car.model}`}
          className={s.carImage}
        />
        <h2>
          {car.make} <span className={s.carModel}>{car.model}</span>, {car.year}
        </h2>
        <p>{car.description}</p>
        <ul>
          <li>Fuel Consumption: {car.fuelConsumption}</li>
          <li>Engine Size: {car.engineSize}</li>
          <li>Type: {car.type}</li>
        </ul>
        <div className={s.accessories}>
          <h3>Accessories and Functionalities:</h3>
          {car.accessories.map((acc, index) => (
            <span key={index}>{acc}</span>
          ))}
          {car.functionalities.map((func, index) => (
            <span key={index}>{func}</span>
          ))}
        </div>
        <div className={s.rentalConditions}>
          <h3>Rental Conditions:</h3>
          <ul>
            {car.rentalConditions.split("\n").map((cond, index) => (
              <li key={index}>{cond}</li>
            ))}
            <li>Mileage: {car.mileage}</li>
            <li>Price: {car.rentalPrice}</li>
          </ul>
        </div>
        <a href="tel:+380730000000" className={s.rentalButton}>
          Rental car
        </a>
      </div>
    </Modal>
  );
};

CarModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  car: PropTypes.object,
};

export default CarModal;
