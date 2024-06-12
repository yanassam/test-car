import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdverts } from "../../redux/reducers/advertsReducer";
import {
  selectAdverts,
  selectError,
  selectStatus,
} from "../../redux/selectors";
import CarCard from "./CarCard";

import s from "./CarCatalog.module.css";

const CarCatalog = () => {
  const dispatch = useDispatch();
  const adverts = useSelector(selectAdverts);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAdverts());
    }
  }, [status, dispatch]);

  return (
    <div className={s.catalogContainer}>
      <h1>Каталог автомобілів</h1>
      {status === "loading" && <p>Загрузка...</p>}
      {status === "failed" && <p>Ошибка при загрузке данных: {error}</p>}
      {status === "succeeded" && (
        <div className={s.catalogFlex}>
          {adverts.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarCatalog;
