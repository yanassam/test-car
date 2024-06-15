import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import CarCatalog from "./pages/CarCatalog/CarCatalog";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Домашня</Link>
          </li>
          <li>
            <Link to="/catalog">Каталог</Link>
          </li>
          <li>
            <Link to="/favorites">Улюблені</Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CarCatalog />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
