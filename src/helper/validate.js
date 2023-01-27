import { toast } from "react-hot-toast";

export async function usernameVelidate(values) {
  const error = usernameVerify({}, values);
  return error;
}

function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username...");
  }
  return error;
}
