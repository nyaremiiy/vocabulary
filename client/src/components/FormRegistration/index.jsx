import { useState } from 'react';
import s from './index.module.css';

const initialData = {
  email: '',
  password: '',
};

const initialErrors = {
  email: '',
  password: '',
};

const FormRegistration = () => {
  const [data, setData] = useState(initialData);
  const [inputErrors, setInputErrors] = useState(initialErrors);
  const [showPassword, setShowPassword] = useState(false);

  const checkEmailError = () => {
    if (data.email.length === 0) {
      return "Це поле обов'язкове";
    }
    return '';
  };

  const checkPassowrdError = () => {
    if (data.password.length === 0) {
      return "Це поле обов'язкове";
    }
    if (data.password.length < 6) {
      return 'Мінімальна кількість символів 6';
    }
    return '';
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setInputErrors({
      email: checkEmailError(),
      password: checkPassowrdError(),
    });

    if (data.email === '' || data.password === '' || data.password.length < 6) {
      return;
    }

    const res = await fetch('/api/registration', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    
    alert(res);
    setData(initialData);
  };

  const emailHandler = (e) => {
    checkEmailError();
    setData({ ...data, email: e.target.value });
    setInputErrors({
      ...inputErrors,
      email: initialErrors.email,
    });
  };

  const passwordHandler = (e) => {
    checkPassowrdError();
    setData({ ...data, password: e.target.value });
    setInputErrors({
      ...inputErrors,
      password: initialErrors.password,
    });
    if (data.password.length === 0) {
      setShowPassword(false);
    }
  };

  return (
    <form className={s.form} onSubmit={(e) => onSubmitForm(e)}>
      <label className={s.label}>
        <input
          type='email'
          className={s.input}
          placeholder='пошта'
          onChange={(e) => emailHandler(e)}
          value={data.email}
          autoComplete='email'
        />
        <div className={s.error}>{inputErrors.email}</div>
      </label>
      <label className={s.label}>
        <input
          type={showPassword ? 'text' : 'password'}
          className={s.input}
          placeholder='пароль'
          onChange={(e) => passwordHandler(e)}
          value={data.password}
          autoComplete='current-password'
        />
        <div className={s.error}>{inputErrors.password}</div>
        {data.password.length > 0 ? (
          showPassword ? (
            <div
              className={s.showPass}
              onClick={() => setShowPassword(!showPassword)}
            >
              Приховати
            </div>
          ) : (
            <div
              className={s.showPass}
              onClick={() => setShowPassword(!showPassword)}
            >
              Показати
            </div>
          )
        ) : null}
      </label>
      <div className={s.buttonBlock}>
        <button type='submit' className={s.button}>
          Зареєструватися
        </button>
      </div>
    </form>
  );
};

export default FormRegistration;
