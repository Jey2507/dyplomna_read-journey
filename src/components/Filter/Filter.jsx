import { useState } from 'react';
import css from '../Filter/Filter.module.css';

export default function Filter({ onFilter }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ title, author });
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

        <button type="submit" className={css.submitButton}>
          To apply
        </button>

      </form>
    </div>
  );
}
