import { useDispatch } from "react-redux";
import css from "../AddBookModal/AddBookModal.module.css";
import { addBook } from "../../redux/books/operations";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function AddBookModal({ id, title, author, pages, image, onClose, setter }) {
  const dispatch = useDispatch();

  const AddFunction = () => {
    dispatch(addBook({
      _id: id,
      title: title,
      author: author,
      imageUrl: image,
      totalPages: pages,
    }));

    setter(true);
    
    onClose(); 
  };

  return (
    <>
      <div className={css.main} onClick={onClose}>
        <div className={css.modal} onClick={(e) => e.stopPropagation()}>
          <img src={image} alt={title} />
          <h2>{title}</h2>
          <h3>{author}</h3>
          <p>{pages} pages</p>
          <button className={css.button} onClick={AddFunction}>Add to library</button>
          <button className={css.close} onClick={onClose}>
            <XMarkIcon className={css.closeIcon} /> 
          </button>
        </div>
      </div>
    </>
  );
}
