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
        <h2 className={s.carName}>
          {car.make} <span className={s.carModel}>{car.model}</span>, {car.year}
        </h2>
        <div className={s.carInfo}>
          <span>{car.address.split(", ")[1]}</span>
          <span className={s.verticalDivider}>
            {car.address.split(", ")[2]}
          </span>
          <span className={s.verticalDivider}>Id: {car.id}</span>
          <span className={s.verticalDivider}>Year: {car.year}</span>
          <span className={s.verticalDivider}>Type: {car.type}</span>
          <br />
          <span className={s.verticalDivider}>
            Fuel Consumption: {car.fuelConsumption}
          </span>
          <span className={s.verticalDivider}>
            Engine Size: {car.engineSize}
          </span>
        </div>
        <p className={s.description}>{car.description}</p>

        <div className={s.accessoriesContainer}>
          <h3>Accessories and Functionalities:</h3>
          <div className={s.accessories}>
            {car.accessories.map((acc, index) => (
              <span key={index}>{acc}</span>
            ))}
            {car.functionalities.map((func, index) => (
              <span key={index}>{func}</span>
            ))}
          </div>
        </div>

        <div className={s.rentalConditions}>
          <h3>Rental Conditions:</h3>
          <ul className={s.rentalUL}>
            {car.rentalConditions.split("\n").map((cond, index) => (
              <li key={index}>
                {cond.includes("Minimum age") ? (
                  <>
                    {cond.split(": ")[0]}:{" "}
                    <span className={s.highlight}>{cond.split(": ")[1]}</span>
                  </>
                ) : (
                  cond
                )}
              </li>
            ))}
            <li>
              Mileage: <span className={s.highlight}>{car.mileage}</span>
            </li>
            <li>
              Price:{" "}
              <span className={s.highlight}>
                {parseFloat(car.rentalPrice.replace("$", ""))}$
              </span>
            </li>
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
