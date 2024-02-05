import { Form, Formik, FormikProps } from "formik";
import FormInput from "../FormInput";
import { changeEmailSchema } from "../Validations/LoginValidation";
import "../index.scss";
import { userAPI } from "../../../store/services/UserService";
import { UpdateUserDto } from "../../../models/dto/update-user.dto";
import AuthError from "../../Auth/AuthErrror";
import { BallTriangle } from "react-loader-spinner";

interface Values {
  password: string;
  email: string;
}

const EmailChangeForm = () => {
  const [updateUser, { error, isSuccess, isLoading }] =
    userAPI.useUpdateUserDataMutation();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (_values, actions) => {
        const dto = new UpdateUserDto();
        dto.email = _values.email;
        dto.password = _values.password;

        updateUser(dto);
        actions.resetForm();
      }}
      validationSchema={changeEmailSchema}
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

          <button
            type="submit"
            disabled={props.isSubmitting || !props.isValid}
            className={`button button--outline`}
          >
            Save Email
          </button>

          {error ? <AuthError>Something went wrong</AuthError> : null}
          {isSuccess ? <AuthError success>Data changed</AuthError> : null}
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

export default EmailChangeForm;
