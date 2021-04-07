import React, { useEffect, useState } from 'react';
import * as electron from 'electron';
import './login.scss';
import { Form, Formik } from 'formik';
import FieldContainer from '../FieldContainer/FieldContainer';
import runValidators from '../../utils/Validators/runValidators';
import { maxLength, minLength, required } from '../../utils/Validators/validators';
import { useDispatch, useSelector } from 'react-redux';
import { LoginF, Register } from '../../redux/reducers/Auth/authReducer';
import { GetLoadingStatus } from '../../redux/reducers/Auth/authSelector';
import SmallLoader from '../SmallLoader/SmallLoader';

/*====================*/

function Login() {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isLoginFormActive, setLoginFormActive] = useState(true);
  const isLoading = useSelector(GetLoadingStatus);

  const dispatch = useDispatch();

  /*====================*/

  function validateLogin(value: string) {
    return runValidators(value, [required, minLength(3), maxLength(12)]);
  }

  function validateEmail(value: string) {
    return runValidators(value, [required, minLength(3)]);
  }

  function validatePassword(value: string) {
    return runValidators(value, [required, minLength(6), maxLength(32)]);
  }

  /*====================*/

  function setActiveFormHandler() {
    setPasswordVisibility(false);
    setLoginFormActive(!isLoginFormActive);
  }

  /*====================*/

  return (
    <div className="login">
      <Formik
        initialValues={{ login: '', email: '', password: '' }}
        onSubmit={(values) => {
          dispatch(Register(values));
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit} className={`${!isLoginFormActive ? 'active ' : ''}form`}>
            <h1>Регистрация</h1>
            <FieldContainer
              name="login"
              error={errors.login}
              touched={touched.login}
              placeholder="Логин"
              validate={validateLogin}
            />
            <FieldContainer
              name="email"
              error={errors.email}
              touched={touched.email}
              placeholder="Почта"
              type="email"
              validate={validateEmail}
            />
            <FieldContainer
              name="password"
              error={errors.password}
              touched={touched.password}
              placeholder="Пароль"
              type={`${isPasswordVisible ? 'text' : 'password'}`}
              validate={validatePassword}
            >
              <button
                onClick={() => {
                  setPasswordVisibility(!isPasswordVisible);
                }}
                type="button"
                className="default-btn flex-container content"
              >
                <span className="material-icons">{isPasswordVisible ? 'visibility_off' : 'visibility'}</span>
              </button>
            </FieldContainer>
            <button type="submit">Войти</button>
            <p>
              Зарегистрированы?{' '}
              <button onClick={setActiveFormHandler} className="default-btn" type="button">
                Войти
              </button>
            </p>
          </Form>
        )}
      </Formik>
      <Formik
        initialValues={{ login: '', password: '' }}
        onSubmit={(values) => {
          dispatch(LoginF(values));
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit} className={`${isLoginFormActive ? 'active ' : ''}form`}>
            <h1>Вход</h1>
            <FieldContainer
              name="login"
              error={errors.login}
              touched={touched.login}
              placeholder="Логин"
              validate={validateLogin}
            />
            <FieldContainer
              name="password"
              error={errors.password}
              touched={touched.password}
              placeholder="Пароль"
              type={`${isPasswordVisible ? 'text' : 'password'}`}
              validate={validatePassword}
            >
              <button
                onClick={() => {
                  setPasswordVisibility(!isPasswordVisible);
                }}
                type="button"
                className="default-btn flex-container content"
              >
                <span className="material-icons">{isPasswordVisible ? 'visibility_off' : 'visibility'}</span>
              </button>
            </FieldContainer>
            <button type="submit">Войти</button>
            <p>
              Нет аккаунта?{' '}
              <button onClick={setActiveFormHandler} className="default-btn" type="button">
                Регистрация
              </button>
            </p>
          </Form>
        )}
      </Formik>
      <SmallLoader isActive={isLoading} />
    </div>
  );
}

/*====================*/

export default Login;
