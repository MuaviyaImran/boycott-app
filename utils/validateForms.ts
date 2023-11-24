import { signInParams } from "types/types";

export function validateLogin(params: signInParams) {
  const errors: signInParams = {};

  if (!params.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(params.email)) {
    errors.email = "Invalid email address";
  }

  if (!params.password) {
    errors.password = "Required";
  } else if (params.password.length < 6 || params.password.length > 20) {
    errors.password =
      "Password must be greater than 6 and less than 20 characters";
  } else if (params.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  return errors;
}
