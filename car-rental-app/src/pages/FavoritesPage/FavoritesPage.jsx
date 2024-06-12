import { useSelector } from "react-redux";
import CarCard from "../CarCatalog/CarCard";
import { selectAdverts } from "../../redux/selectors";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import s from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const adverts = useSelector(selectAdverts);
  const [favorites] = useLocalStorage("favorites", []);

  const favoriteAdverts = adverts.filter((advert) =>
    favorites.includes(advert.id)
  );

  return (
    <div>
      <h1>Вибрані автомобілі</h1>
      <div className={s.catalogFlex}>
        {favoriteAdverts.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            isFavorite={favorites.includes(car.id)}
            onToggleFavorite={() => {}}
            onLearnMore={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
