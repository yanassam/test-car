import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdverts } from "../../redux/reducers/advertsReducer";

const CarCatalog = () => {
  const dispatch = useDispatch();
  const adverts = useSelector((state) => state.adverts.items);
  const status = useSelector((state) => state.adverts.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAdverts());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h1>Каталог автомобілів</h1>
      {status === "loading" && <p>Загрузка...</p>}
      {status === "succeeded" && (
        <ul>
          {adverts.map((car) => (
            <li key={car.id}>
              <img src={car.img} alt={`${car.make} ${car.model}`} width="100" />
              <p>
                {car.make} {car.model}
              </p>
              <p>{car.description}</p>
            </li>
          ))}
        </ul>
      )}
      {status === "failed" && <p>Ошибка при загрузке данных</p>}
    </div>
  );
};

export default CarCatalog;
