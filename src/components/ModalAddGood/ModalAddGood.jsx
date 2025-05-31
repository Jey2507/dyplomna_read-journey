import css from './ModalAddGood.module.css';

export default function ModalAddGood({ onClose }) {
  return (
    <div onClick={onClose} className={css.main}>
      <div className={css.backdrop}>
        <div className={css.box}>
          <h1>👍</h1>
          <h2>Good job</h2>
          <p>
            Your book is now in <span>the library!</span> The joy knows no bounds and now you can start your training
          </p>
          <button onClick={onClose}>x</button>
        </div>
      </div>
    </div>
  );
}
