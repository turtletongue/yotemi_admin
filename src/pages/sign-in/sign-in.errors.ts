import baseErrors from "@store/base-errors";

const signInErrors = {
  401: "Неправильный логин или пароль",
  ...baseErrors,
} as const;

export default signInErrors;
