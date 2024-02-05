import { Form, Formik, FormikProps } from "formik";
import FormInput from "../FormInput";
import { changePasswordSchema } from "../Validations/LoginValidation";
import "../index.scss";
import { userAPI } from "../../../store/services/UserService";
import { UpdateUserDto } from "../../../models/dto/update-user.dto";
import { BallTriangle } from "react-loader-spinner";
import AuthError from "../../Auth/AuthErrror";

interface Values {
  oldPassword: string;
  newPassword: string;
}

const PasswordChangeForm = () => {
  const [updateUser, { error, isSuccess, isLoading }] =
    userAPI.useUpdateUserDataMutation();

  return (
    <Formik
      initialValues={{ oldPassword: "", newPassword: "" }}
      onSubmit={async (_values, actions) => {
        const dto = new UpdateUserDto();
        dto.oldPassword = _values.oldPassword;
        dto.password = _values.newPassword;

        updateUser(dto);
        actions.resetForm();
      }}
      validationSchema={changePasswordSchema}
    >
      {(props: FormikProps<Values>) => (
        <Form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <FormInput
            label="Old password"
            name="oldPassword"
            type="password"
            placeholder="Enter your old password"
          />

          <FormInput
            label="New password"
            name="newPassword"
            type="password"
            placeholder="Enter your new password"
          />

          <button
            type="submit"
            disabled={props.isSubmitting || !props.isValid}
            className={`button button--outline`}
          >
            Save Password
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

export default PasswordChangeForm;
