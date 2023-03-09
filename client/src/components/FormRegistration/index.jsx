import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import s from './index.module.css';

const FormRegistration = () => {
  const [dataForm, setDataForm] = useState({
    email: '',
    password: '',
  });
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSubmitForm = (data) => {
    setDataForm({ ...data });

    axios
      .post('/api/registration', {
        ...data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    reset({
      email: '',
      password: '',
    });
    setDataForm({
      email: '',
      password: '',
    });
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(handleSubmitForm)}>
      <label className={s.label}>
        <input
          className={s.input}
          type='email'
          placeholder='пошта'
          autoComplete='email'
          {...register('email', {
            required: "Це поле обов'язкове",
            minLength: {
              message: 'Мінімальна кількість символів 3',
              value: 3,
            },
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: 'Невірний формат пошти',
            },
            onChange: (e) => {
              setDataForm({ ...dataForm, email: e.target.value });
              console.log(dataForm);
            },
          })}
        />
        <div className={s.error}>
          {errors?.email && (errors?.email?.message || '')}
        </div>
      </label>
      <label className={s.label}>
        <input
          className={s.input}
          type={!isShowPassword ? 'password' : 'text'}
          placeholder='пароль'
          autoComplete='password'
          {...register('password', {
            required: "Це поле обов'язкове",
            minLength: {
              message: 'Мінімальна кількість символів 6',
              value: 6,
            },
            onChange: (e) => {
              setDataForm((prevState) => ({
                ...prevState,
                password: e.target.value,
              }));
              console.log(dataForm);
            },
          })}
        />
        <div className={s.error}>
          {errors?.password && (errors?.password?.message || '')}
        </div>
        {dataForm?.password.length > 0 ? (
          isShowPassword ? (
            <div
              className={s.showPass}
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              Приховати
            </div>
          ) : (
            <div
              className={s.showPass}
              onClick={() => setIsShowPassword(!isShowPassword)}
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
