import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewBook } from '../../redux/books/operations.js'; // Імпорт функції
import css from '../MyFilter/MyFilter.module.css';

export default function MyFilter() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState(''); 
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = {
      title,
      author,
      totalPages: Number(pages) || undefined, 
    };

    try {
      await dispatch(addNewBook(bookData)).unwrap();
      setTitle('');
      setAuthor('');
      setPages('');
      // onFilter(bookData); 
      // console.success("Success to add book");
    } catch (error) {
      console.error('Failed to add book:', error);
     
    }
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