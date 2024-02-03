import { Form, Formik, FormikProps } from "formik";
import FormInput from "../FormInput";
import { signUpSchema } from "../Validations/LoginValidation";
import ChangeAuth from "../../Auth/ChangeAuth";
import "../index.scss";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchUserRegister } from "../../../store/reducers/ActionCreators";
import AuthError from "../../Auth/AuthErrror";
import { BallTriangle } from "react-loader-spinner";
import { useEffect } from "react";
import { toggleError } from "../../../store/reducers/UserSlice";

interface Values {
  username: string;
  password: string;
  email: string;
}

const SignUpForm = () => {
  const location = useLocation();
  const { error, isLoading, isRegistered } = useAppSelector(
    (state) => state.userReduser
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(toggleError());
  }, []);

  return (
    <Formik
      initialValues={{ email: "", password: "", username: "" }}
      onSubmit={async (values, actions) => {
        dispatch(fetchUserRegister(values));
        actions.resetForm();
      }}
      validationSchema={signUpSchema}
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
            label="Nickname"
            name="username"
            type="text"
            placeholder="Enter your nickname"
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

          {isRegistered ? (
            <AuthError success>
              Registration successfull! Sent email confirm lint to Your Email
            </AuthError>
          ) : null}
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

          {error ? <AuthError>{error}</AuthError> : null}
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
