import { FC, useState } from "react";

import "./index.scss";
import { useField } from "formik";

interface IFormInputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

const FormInput: FC<IFormInputProps> = ({
  label,

  ...props
}) => {
  const [field, meta] = useField(props);

  const [visibility, setVisibility] = useState<boolean>(
    props.type === "password" ? false : true
  );

  const togglePasswordVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <div className="input">
      <label className="input__title">{label}</label>
      <div className="input__container">
        <input
          {...field}
          className={`input__field ${
            meta.touched && meta.error ? "input__field--error" : ""
          }`}
          type={visibility ? "text" : "password"}
          name={props.name}
          placeholder={props.placeholder}
        />
        {props.type === "password" && field.value.length > 0 && (
          <img
            className="input__toggle"
            onClick={togglePasswordVisibility}
            src={
              visibility
                ? `/svg/eye/${
                    meta.touched && meta.error ? "error-" : ""
                  }close-eye.svg`
                : `/svg/eye/${
                    meta.touched && meta.error ? "error-" : ""
                  }open-eye.svg`
            }
            alt=""
          />
        )}
      </div>
      {meta.touched && meta.error && (
        <div style={{ color: "red" }}>{meta.error}</div>
      )}
    </div>
  );
};

export default FormInput;
