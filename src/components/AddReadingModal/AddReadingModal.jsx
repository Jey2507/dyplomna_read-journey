import { useNavigate } from "react-router-dom";
import css from "../AddReadingModal/AddReadingModal.module.css";

export default function AddReadingModal({ id, title, author, pages, image, onClose }) {
  const navigate = useNavigate();

  const AddFunction = () => {
    navigate("/myreading", {
      state: {
        id,
        title,
        author,
        pages,
        image,
      },
    });
  };

  return (
    <div className={css.main} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <img src={image} alt={title} />
        <h2>{title}</h2>
        <h3>{author}</h3>
        <p>{pages} pages</p>
        <button className={css.button} onClick={AddFunction}>Start reading</button>
        <button className={css.close} onClick={onClose}>x</button>
      </div>
    </div>
  );
}
