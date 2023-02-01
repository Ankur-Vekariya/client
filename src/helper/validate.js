import { toast } from "react-hot-toast";
import { authentication} from '../helper/helper'
export async function usernameVelidate(values) {
  const errors = usernameVerify({}, values);
  if (values.username) {
    const {status} = await authentication(values.username)
    if (status != 200 ) {
      errors.exist = toast.error('User does not exist')
    }
  }
  return errors;
}

export async function passwordVelidate(values) {
  const error = passwordVerify({}, values);
  return error;
}

export async function resetPasswordVelidation(values) {
  const error = passwordVerify({}, values);
  if (values.password !== values.confirm_pwd) {
    error.exist = toast.error("Password not match");
  }
  return error;
}

export async function registerVelidation(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);
  return errors;
}

export async function profileValidation(values) {
  const errors = emailVerify({}, values);
  return errors;
}
// velidate password

function passwordVerify(error = {}, values) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!values.password) {
    error.password = toast.error("Password Required");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Wrong Password...");
  } else if (values.password.length < 4) {
    error.password = toast.error(
      "Password length must be more then 4 character"
    );
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error("Password must have specil characters...");
  }
  return error;
}

// velidate username

function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username...");
  }
  return error;
}

// velidate email

function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("email is required");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("wrong email...");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Invalid email address...");
  }
  return error;
}
