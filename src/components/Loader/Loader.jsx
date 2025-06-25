import { TailSpin} from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loaderContainer}>
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#f1f1f199"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}