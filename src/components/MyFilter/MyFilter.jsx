import { useState } from 'react';
import css from '../MyFilter/MyFilter.module.css';

export default function MyFilter({ onFilter }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState(''); // ✅ новий стан

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ title, author, pages }); // ✅ додали pages
  };

  return (
    <div className={css.filterBox}>
      <h2 className={css.titleFilters}>Filters:</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.inputGroup}>
          <div className={css.boxFlex}>
            <label className={css.inputLabel}>Book title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={css.input}
              placeholder="Enter book title"
            />
          </div>
        </div>

        <div className={css.inputGroup}>
          <div className={css.boxFlex}>
            <label className={css.inputLabel}>The author:</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={css.input}
              placeholder="Enter author name"
            />
          </div>
        </div>

        <div className={css.inputGroup}>
          <div className={css.boxFlex}>
            <label className={css.inputLabel}>Number of pages:</label>
            <input
              type="number"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className={css.input}
              placeholder="0"
              min="1"
            />
          </div>
        </div>

        <button type="submit" className={css.submitButton}>
          Add book
        </button>
      </form>
    </div>
  );
}
