import s from "./HomePage.module.css";
const HomePage = () => {
  return (
    <div className="page">
      <div className={s.homePage}>
        <h1>Ласкаво просимо до компанії з оренди автомобілів</h1>
        <p>Ми надаємо найкращі автомобілі для оренди по всій Україні.</p>
      </div>
    </div>
  );
};

export default HomePage;
