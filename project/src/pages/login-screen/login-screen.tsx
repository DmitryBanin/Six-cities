import Logo from '../../components/logo/logo';
import { FormEvent, useRef } from 'react';
import { useAppDispatch } from '../../hooks/index';
import { loginAction } from '../../store/api-actions';
import { passwordRegExp } from '../../const';

function LoginScreen(): JSX.Element {

  const dispatch = useAppDispatch();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    let validity = '';

    switch (true) {
      case /\s/g.test(target.value):
        validity = 'Enter a password without spaces';
        break;
      case !passwordRegExp.test(target.value):
        validity = 'Enter at least one letter and one digit';
        break;
    }

    target.setCustomValidity(validity);
    target.reportValidity();
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      }));
    }
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleFormSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  id="name"
                  placeholder="Email"
                  ref={loginRef}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  ref={passwordRef}
                  onChange={(evt) => {
                    handleInputChange(evt);
                  }}
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <div className="locations__item-link">
                <span>Amsterdam</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
export default LoginScreen;
