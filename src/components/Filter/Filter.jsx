import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTitleFilter, setAuthorFilter, clearFilters } from '../../redux/filters/slice.js';
import { toast } from 'react-hot-toast';
import css from '../Filter/Filter.module.css';
import { selectRecommendedBooks } from '../../redux/books/selectors.js';

export default function Filter() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const dispatch = useDispatch();

  const books = useSelector(selectRecommendedBooks);
  const { title: filterTitle, author: filterAuthor } = useSelector((state) => state.filters);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !author.trim()) {
      console.warn('No filter criteria provided');
      return;
    }
    dispatch(setTitleFilter(title));
    dispatch(setAuthorFilter(author));
  };

  const handleClear = () => {
    setTitle('');
    setAuthor('');
    dispatch(clearFilters());
  };

  useEffect(() => {
    if (filterTitle || filterAuthor) {
      const filtered = books.filter((book) => {
        const matchesTitle = !filterTitle || book.title.toLowerCase().includes(filterTitle.toLowerCase());
        const matchesAuthor = !filterAuthor || book.author.toLowerCase().includes(filterAuthor.toLowerCase());
        return matchesTitle && matchesAuthor;
      });
      if (filtered.length === 0) {
        toast.error('No matches found for the filter criteria!', {
          duration: 3000, 
          position: 'top-center',
        });
      }
    }
  }, [filterTitle, filterAuthor, books]);

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
        <button type="button" className={css.clearButton} onClick={handleClear}>
          Clear filters
        </button>
      </form>
    </div>
  );
}