import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
  disabled?: boolean;
}

const LoadMoreBtn = ({ onClick, disabled = false }: LoadMoreBtnProps) => {
  return (
    <div>
      <button type="button" onClick={onClick} className={css.loadMoreBtn}>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
