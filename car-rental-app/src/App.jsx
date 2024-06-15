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
import Navigation from "./components/Navigation/Navigation";
import Container from "./components/Container/Container";

const App = () => {
  return (
    <Router>
      <Navigation />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CarCatalog />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
