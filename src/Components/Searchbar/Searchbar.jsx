import { useState } from 'react';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (input.trim('') !== '') {
      onSubmit(input);
      // this.setState({ input: '' });
    }
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={input}
        />
      </form>
    </header>
  );
}
