import { useDispatch, useSelector } from "react-redux";
import CarCard from "../CarCatalog/CarCard";
import { selectAdverts, selectStatus } from "../../redux/selectors";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import s from "./FavoritesPage.module.css";
import { useEffect, useState } from "react";
import CarModal from "../../components/CarModal/CarModal";
import { fetchAdverts } from "../../redux/reducers/advertsReducer";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const adverts = useSelector(selectAdverts);
  const status = useSelector(selectStatus);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAdverts());
    }
  }, [status, dispatch]);

  const favoriteAdverts = adverts.filter((advert) =>
    favorites.includes(advert.id)
  );

  const openModal = (car) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCar(null);
  };

  const toggleFavorite = (carId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(carId)
        ? prevFavorites.filter((id) => id !== carId)
        : [...prevFavorites, carId]
    );
  };

  return (
    <div className="page">
      <h1 className={s.title}>Ви обрали ці авто</h1>
      <div className={s.catalogFlex}>
        {favoriteAdverts.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            isFavorite={favorites.includes(car.id)}
            onToggleFavorite={() => toggleFavorite(car.id)}
            onLearnMore={() => openModal(car)}
          />
        ))}
      </div>
      <CarModal isOpen={isModalOpen} onClose={closeModal} car={selectedCar} />
    </div>
  );
};

export default FavoritesPage;
