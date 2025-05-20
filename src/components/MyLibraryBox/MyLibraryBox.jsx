import { useState, useEffect, useRef } from "react";
import css from "../MyLibraryBox/MyLibraryBox.module.css";
import books from "../../assets/images/books.png";
import { myBooks } from "../../redux/books/operations";
import { useDispatch } from "react-redux";

export default function MyLibraryBox() {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    dispatch(myBooks())
  },[dispatch])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={css.container}>
      <h2 className={css.title}>My library</h2>

      <div className={css.mainBox}>
        <div className={css.boxFlex}>
          <div className={css.imageBox}>
            <img className={css.image} src={books} alt="books" />
          </div>
          <h3 className={css.descr}>
            To start training, add <span className={css.spanColor}>some of your books</span> or from the recommended ones
          </h3>
        </div>
      </div>

      <div className={css.dropdownWrapper} ref={dropdownRef}>
        <button className={css.dropdownButton} onClick={toggleDropdown}>
          All books
          <span className={`${css.arrow} ${isOpen ? css.arrowOpen : ""}`}>❯</span>
        </button>

        <ul className={`${css.dropdownList} ${isOpen ? css.dropdownListActive : ""}`}>
          <li className={css.dropdownItemDisabled}>Unread</li>
          <li className={css.dropdownItemDisabled}>In progress</li>
          <li className={css.dropdownItemDisabled}>Done</li>
          <li className={css.dropdownItemActive}>All books</li>
        </ul>
      </div>
    </div>
  );
}
