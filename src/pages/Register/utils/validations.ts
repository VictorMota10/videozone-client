import { object, string, ref } from "yup";

export const onlyLetters = /^[A-Za-z]+$/;

const REQUIRED_FIELD_MESSAGE = "Required field";

const regexPassword = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/
);

export const validations = object().shape({
  username: string().required(REQUIRED_FIELD_MESSAGE),
  email: string().required(REQUIRED_FIELD_MESSAGE),
  country: string().required(REQUIRED_FIELD_MESSAGE),
  birthdate: string().required(REQUIRED_FIELD_MESSAGE),
  password: string()
    .required(REQUIRED_FIELD_MESSAGE)
    .min(8, "At least 8 characters.")
    .test("password", "Senha não possui o padrão minimo", (value, context) => {
      let result = true;
      if (value) {
        result = regexPassword.test(value);
      }

      return result;
    }),
});
