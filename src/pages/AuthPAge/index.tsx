import { useLocation, useNavigate } from "react-router-dom";
import BackArrow from "../../components/Navigations/BackwardArrow";
import PageInfoTitle from "../../components/Phone/PageInfoTitle";
import PhonePage from "../../components/Phone/PhonePage";
import PhonePageContent from "../../components/Phone/PhonePageContent";
import { useEffect } from "react";
import { BALANCE_ROUTE, SIGNIN_ROUTE } from "../../components/AppRouter/consts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleIsRegistered } from "../../store/reducers/UserSlice";
import LoginForm from "../../components/Forms/LoginForm";
import SignUpForm from "../../components/Forms/SingUpFrom";
import RecoveryForm from "../../components/Forms/RecoveryForm";

const AuthPage = () => {
  const dispatch = useAppDispatch();

  const { isAuth, isRegistered } = useAppSelector((state) => state.userReduser);

  // Utils functions
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate(BALANCE_ROUTE);
    }
  }, [isAuth]);

  useEffect(() => {
    if (isRegistered && location.pathname === SIGNIN_ROUTE) {
      dispatch(toggleIsRegistered());
    }
  }, [isRegistered]);

  const getTitle = (): { title: string; subtitle: string } => {
    switch (location.pathname) {
      case "/signup": {
        return { title: "Sign up", subtitle: "Choose a registration method" };
      }

      case "/signin": {
        return { title: "Sign in", subtitle: "Select login method" };
      }

      case "/recovery": {
        return {
          title: "Recovery password",
          subtitle: "Choose a recovery method",
        };
      }

      default: {
        return { title: "page", subtitle: "unknown" };
      }
    }
  };

  return (
    <PhonePage>
      <section style={{ marginTop: "50px", padding: "0 20px" }}>
        <BackArrow />
      </section>
      <PageInfoTitle {...getTitle()} />

      <PhonePageContent>
        {location.pathname === "/signup" && (
          <>
            <SignUpForm />
          </>
        )}

        {location.pathname === "/signin" && (
          <>
            <LoginForm />
          </>
        )}

        {location.pathname === "/recovery" && (
          <>
            <RecoveryForm />
          </>
        )}
      </PhonePageContent>
    </PhonePage>
  );
};

export default AuthPage;
