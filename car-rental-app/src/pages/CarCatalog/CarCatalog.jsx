// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAdverts } from "../../redux/reducers/advertsReducer";
// import {
//   selectAdverts,
//   selectError,
//   selectStatus,
// } from "../../redux/selectors";
// import CarCard from "./CarCard";
// import CarModal from "../../components/CarModal/CarModal";
// import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
// import FilterForm from "../../components/FilterForm/FilterForm";

// import { useLocalStorage } from "../../hooks/useLocalStorage";

// import s from "./CarCatalog.module.css";

// const CarCatalog = () => {
//   const dispatch = useDispatch();
//   const adverts = useSelector(selectAdverts);
//   const status = useSelector(selectStatus);
//   const error = useSelector(selectError);

//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedCar, setSelectedCar] = useState(null);
//   const [visibleCount, setVisibleCount] = useState(12);
//   const [favorites, setFavorites] = useLocalStorage("favorites", []);
//   const [filteredAdverts, setFilteredAdverts] = useState([]);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchAdverts());
//     }
//   }, [status, dispatch]);

//   useEffect(() => {
//     setFilteredAdverts(adverts);
//   }, [adverts]);

//   const openModal = (car) => {
//     setSelectedCar(car);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setSelectedCar(null);
//   };

//   const loadMore = () => {
//     setVisibleCount((prevCount) => prevCount + 12);
//   };

//   const toggleFavorite = (carId) => {
//     setFavorites((prevFavorites) =>
//       prevFavorites.includes(carId)
//         ? prevFavorites.filter((id) => id !== carId)
//         : [...prevFavorites, carId]
//     );
//   };

//   const handleFilter = ({ brand, price, mileageFrom, mileageTo }) => {
//     let filtered = adverts;

//     if (brand) {
//       filtered = filtered.filter((car) =>
//         car.make.toLowerCase().includes(brand.toLowerCase())
//       );
//     }

//     if (price) {
//       filtered = filtered.sort((a, b) =>
//         price === "low"
//           ? a.rentalPrice - b.rentalPrice
//           : b.rentalPrice - a.rentalPrice
//       );
//     }

//     if (mileageFrom) {
//       filtered = filtered.filter((car) => car.mileage >= parseInt(mileageFrom));
//     }

//     if (mileageTo) {
//       filtered = filtered.filter((car) => car.mileage <= parseInt(mileageTo));
//     }

//     setFilteredAdverts(filtered);
//   };

//   return (
//     <div className={s.catalogContainer}>
//       <h1>Каталог автомобілів</h1>
//       <FilterForm onFilter={handleFilter} />
//       {status === "loading" && <p>Загрузка...</p>}
//       {status === "failed" && <p>Ошибка при загрузке данных: {error}</p>}
//       {status === "succeeded" && (
//         <>
//           <div className={s.catalogFlex}>
//             {filteredAdverts.slice(0, visibleCount).map((car) => (
//               <CarCard
//                 key={car.id}
//                 car={car}
//                 onLearnMore={() => openModal(car)}
//                 onToggleFavorite={() => toggleFavorite(car.id)}
//                 isFavorite={favorites.includes(car.id)}
//               />
//             ))}
//           </div>
//           {visibleCount < filteredAdverts.length && (
//             <LoadMoreBtn onLoadMore={loadMore} />
//           )}
//           <CarModal
//             isOpen={isModalOpen}
//             onClose={closeModal}
//             car={selectedCar}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default CarCatalog;
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
import FilterForm from "../../components/FilterForm/FilterForm";
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
  const [filteredAdverts, setFilteredAdverts] = useState([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAdverts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    setFilteredAdverts(adverts);
  }, [adverts]);

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

  const handleFilter = ({ brand, price, mileageFrom, mileageTo }) => {
    let filtered = [...adverts];

    if (brand) {
      filtered = filtered.filter((car) =>
        car.make.toLowerCase().includes(brand.toLowerCase())
      );
    }

    if (price) {
      filtered = filtered.sort((a, b) => {
        const priceA = parseFloat(a.rentalPrice.replace(/[^0-9.-]+/g, ""));
        const priceB = parseFloat(b.rentalPrice.replace(/[^0-9.-]+/g, ""));
        return price === "low" ? priceA - priceB : priceB - priceA;
      });
    }

    if (mileageFrom) {
      filtered = filtered.filter((car) => car.mileage >= parseInt(mileageFrom));
    }

    if (mileageTo) {
      filtered = filtered.filter((car) => car.mileage <= parseInt(mileageTo));
    }

    setFilteredAdverts(filtered);
  };

  return (
    <div className={s.catalogContainer}>
      <h1>Каталог автомобілів</h1>
      <FilterForm onFilter={handleFilter} />
      {status === "loading" && <p>Загрузка...</p>}
      {status === "failed" && <p>Ошибка при загрузке данных: {error}</p>}
      {status === "succeeded" && (
        <>
          <div className={s.catalogFlex}>
            {filteredAdverts.slice(0, visibleCount).map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onLearnMore={() => openModal(car)}
                onToggleFavorite={() => toggleFavorite(car.id)}
                isFavorite={favorites.includes(car.id)}
              />
            ))}
          </div>
          {visibleCount < filteredAdverts.length && (
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
