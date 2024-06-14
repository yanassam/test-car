import s from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onLoadMore }) => {
  return (
    <button onClick={onLoadMore} className={s.button}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
