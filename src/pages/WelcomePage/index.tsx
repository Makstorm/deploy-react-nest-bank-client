import { FC, useEffect } from "react";
import ConfirmButton from "../../components/Navigations/ConfirmButton";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import {
  BALANCE_ROUTE,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE,
} from "../../components/AppRouter/consts";
import { useAppSelector } from "../../hooks/redux";

const WelcomePage: FC = () => {
  const navigate = useNavigate();

  const isAuth = useAppSelector((state) => state.userReduser.isAuth);

  useEffect(() => {
    if (isAuth) {
      navigate(BALANCE_ROUTE);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <div className="welcome-page">
      <header className="welcome-page__header">
        {/* <PhoneCelular /> */}
        <div className="welcome-page__text">
          <h1 className="text-title">Hello!</h1>
          <h2 className="text-subtitle">Welcome to bank app</h2>
        </div>
        <img
          src="/homepage/home-page-img.png"
          alt="welcome-page-img"
          className="welcome-page__image"
        />
      </header>

      <section className="welcome-page__buttons">
        <ConfirmButton outline={false} onClick={() => navigate(SIGNUP_ROUTE)}>
          Sign Up
        </ConfirmButton>
        <ConfirmButton outline={true} onClick={() => navigate(SIGNIN_ROUTE)}>
          Sign In
        </ConfirmButton>
      </section>

      {/* <HomeBar /> */}
    </div>
  );
};

export default WelcomePage;
