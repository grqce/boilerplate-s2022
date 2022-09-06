import { postData } from '../util/api';

// const BACKENDURL = 'http://localhost:4000';
/**
 * Sends a request to the server to log in a user
 * @param email The email of the user to log in
 * @param password The password for the user's account
 * @throws An {@link Error} with a `messsage` field describing the issue in verifying
 */
async function loginUser(email: string, password: string) {
  const res = await postData('auth/login', {
    email,
    password,
  });
  if (res.error) {
    throw Error(res.error.message);
  }
  return res.data;
}

/**
 * Sends a request to the server to verify an account
 * @param verificationToken The token used to identify the verification attempt
 * @throws An {@link Error} with a `messsage` field describing the issue in verifying
 */
async function verifyAccount(verificationToken: string) {
  const res = await postData('auth/verify-account', {
    token: verificationToken,
  });
  if (res.error) {
    throw Error(res.error.message);
  }
}

/**
 * Sends a request to the server to register a user for an account
 * @param firstName
 * @param lastName
 * @param email
 * @param password
 * @throws An {@link Error} with a `messsage` field describing the issue in verifying
 */
async function register(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) {
  const res = await postData('auth/register', {
    firstName,
    lastName,
    email,
    password,
  });
  if (res.error) {
    throw Error(res.error.message);
  }
}

/**
 * Sends a request to the server to email a reset password link to a user
 * @param email The email of the user
 * @throws An {@link Error} with a `messsage` field describing the issue in
 * sending the email
 */
async function sendResetPasswordEmail(email: string) {
  const res = await postData('auth/send-reset-password-email', { email });
  if (res.error) {
    throw Error(res.error.message);
  }
}

/**
 * Sends a request to the server to reset a password for a user
 * @param password The new password for the userr
 * @param token The token identifying the reset password attempt
 * @throws An {@link Error} with a `messsage` field describing the issue in
 * resetting the password
 */
async function resetPassword(password: string, token: string) {
  const res = await postData('auth/reset-password', { password, token });
  if (res.error) {
    throw Error(res.error.message);
  }
}

export {
  register,
  loginUser,
  verifyAccount,
  sendResetPasswordEmail,
  resetPassword,
};