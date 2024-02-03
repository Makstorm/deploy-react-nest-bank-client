import { Form, Formik, FormikProps } from "formik";
import FormInput from "../FormInput";
import { loginSchema } from "../Validations/LoginValidation";
import ChangeAuth from "../../Auth/ChangeAuth";
import "../index.scss";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchUser } from "../../../store/reducers/ActionCreators";
import { BallTriangle } from "react-loader-spinner";
import AuthError from "../../Auth/AuthErrror";
import { useEffect } from "react";
import { toggleError } from "../../../store/reducers/UserSlice";

interface Values {
  password: string;
  email: string;
}

const LoginForm = () => {
  const location = useLocation();
  const { error, isLoading } = useAppSelector((state) => state.userReduser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(toggleError());
  }, []);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values, actions) => {
        dispatch(fetchUser(values));
        actions.resetForm();
      }}
      validationSchema={loginSchema}
    >
      {(props: FormikProps<Values>) => (
        <Form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <FormInput
            label="Email"
            name="email"
            type="text"
            placeholder="Enter your email"
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
          />

          {(location.pathname === "/signup" ||
            location.pathname === "/signin") && (
            <ChangeAuth
              text={
                location.pathname === "/signup"
                  ? "Already have an account?"
                  : "Forgot your password?"
              }
            />
          )}

          <button
            type="submit"
            disabled={props.isSubmitting || !props.isValid}
            className={`button `}
          >
            Continue
          </button>

          {error ? <AuthError>{error}</AuthError> : null}
          {isLoading && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <BallTriangle
                height={40}
                width={40}
                radius={5}
                color="#5b94e9"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
