import * as yup from "yup";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required(),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "Please enter a valid password" })
    .required(),
});

export const signUpSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required(),
  username: yup.string().min(4).required(),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "Please enter a valid password" })
    .required(),
});

export const recoverySchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required(),
});

export const changeEmailSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required(),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "Please enter a valid password" })
    .required(),
});

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "Please enter a valid password" })
    .required(),
  newPassword: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "Please enter a valid password" })
    .required(),
});
