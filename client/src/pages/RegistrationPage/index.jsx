import s from './index.module.css';
import { Link } from 'react-router-dom';
import { FormRegistration } from './../../components';

const Registration = () => {
  return (
    <div className={s.registration}>
      <div className={`container ${s.wrapper}`}>
        <div className={s.form}>
          <h2 className={s.title}>Реєстрація</h2>
          <FormRegistration />
          <div className={s.info}>
            Уже зареєстровані?
            <Link to='/' className={s.login}>
              Увійти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
