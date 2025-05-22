import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import { ChangeEvent, FormEvent, useState } from "react";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setQuery(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!query.trim()) {
      toast.custom((t) => (
        <div className={css.toast}>
          🍞 <span>Can not be empty!</span>
        </div>
      ));
      return;
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <>
      <header className={css.header}>
        <form onSubmit={handleSubmit} className={css.form}>
          <input
            type="text"
            name="text"
            value={query}
            onChange={handleChange}
            className={css.inputSearch}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit" className={css.button}>
            Search
          </button>
        </form>
      </header>
    </>
  );
};

export default SearchBar;
