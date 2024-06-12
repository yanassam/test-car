import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdverts } from "../../redux/reducers/advertsReducer";
import {
  selectAdverts,
  selectError,
  selectStatus,
} from "../../redux/selectors";
import CarCard from "./CarCard";
import CarModal from "../../components/CarModal/CarModal";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import s from "./CarCatalog.module.css";

const CarCatalog = () => {
  const dispatch = useDispatch();
  const adverts = useSelector(selectAdverts);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAdverts());
    }
  }, [status, dispatch]);

  // useEffect(() => {
  //   console.log("Current favorite cars:", favorites);
  // }, [favorites]);

  const openModal = (car) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCar(null);
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 12);
  };

  const toggleFavorite = (carId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(carId)
        ? prevFavorites.filter((id) => id !== carId)
        : [...prevFavorites, carId]
    );
  };

  return (
    <div className={s.catalogContainer}>
      <h1>Каталог автомобілів</h1>
      {status === "loading" && <p>Загрузка...</p>}
      {status === "failed" && <p>Ошибка при загрузке данных: {error}</p>}
      {status === "succeeded" && (
        <>
          <div className={s.catalogFlex}>
            {adverts.slice(0, visibleCount).map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onLearnMore={() => openModal(car)}
                onToggleFavorite={() => toggleFavorite(car.id)}
                isFavorite={favorites.includes(car.id)}
              />
            ))}
          </div>
          {visibleCount < adverts.length && (
            <LoadMoreBtn onLoadMore={loadMore} />
          )}
          <CarModal
            isOpen={isModalOpen}
            onClose={closeModal}
            car={selectedCar}
          />
        </>
      )}
    </div>
  );
};

export default CarCatalog;
