import { Link } from "react-router-dom";

const Navigation = () => {
  return (
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
  );
};

export default Navigation;
