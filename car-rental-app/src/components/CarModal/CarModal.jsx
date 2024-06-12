import Modal from "react-modal";
import s from "./CarModal.module.css";

const CarModal = ({ isOpen, onClose, car }) => {
  if (!car) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={s.modal}
      overlayClassName={s.overlay}
    >
      <button className={s.closeButton} onClick={onClose}>
        &times;
      </button>
      <img
        src={car.img}
        alt={`${car.make} ${car.model}`}
        className={s.carImage}
      />
      <h2>
        {car.make} {car.model}, {car.year}
      </h2>
      <p>{car.description}</p>
      <ul>
        <li>Location: {car.address.split(", ").slice(-2, -1)[0]}</li>
        <li>Country: {car.address.split(", ").pop()}</li>
        <li>Company: {car.rentalCompany}</li>
        <li>Type: {car.type}</li>
        <li>Model: {car.model}</li>
        <li>ID: {car.id}</li>
        <li>Features: {car.functionalities.join(", ")}</li>
      </ul>
      <a href="tel:+380730000000" className={s.rentalCarButton}>
        Rental car
      </a>
    </Modal>
  );
};

export default CarModal;
