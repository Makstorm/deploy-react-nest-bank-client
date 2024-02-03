import { Form, Formik, FormikProps } from "formik";
import FormInput from "../FormInput";
import "../index.scss";
import { userAPI } from "../../../store/services/UserService";
import AuthError from "../../Auth/AuthErrror";
import { BallTriangle } from "react-loader-spinner";
import { recoverySchema } from "../Validations/LoginValidation";

interface Values {
  email: string;
}

const RecoveryForm = () => {
  const [passwordRecovery, { error, isSuccess, isLoading }] =
    userAPI.useUserPasswordRecoverMutation();

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={async (values, actions) => {
        passwordRecovery(values.email);
        actions.resetForm();
      }}
      validationSchema={recoverySchema}
    >
      {(props: FormikProps<Values>) => (
        <Form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <FormInput
            label="Email"
            name="email"
            type="text"
            placeholder="Enter your email"
          />

          <button
            type="submit"
            disabled={props.isSubmitting}
            className={`button `}
          >
            Change password
          </button>

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

          {error ? <AuthError>Something wrong happend</AuthError> : null}

          {isSuccess ? (
            <AuthError success>Email password recovery sent</AuthError>
          ) : null}
        </Form>
      )}
    </Formik>
  );
};

export default RecoveryForm;
