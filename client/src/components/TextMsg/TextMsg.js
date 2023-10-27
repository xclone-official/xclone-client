const MSG_TYPES = {
  SERVER_ERROR: "SERVER_ERROR",

  REGISTERED_SUCCESS: "REGISTERED_SUCCESS",
  USERNAME_EXIST: "USERNAME_EXIST",
  EMAIL_EXIST: "EMAIL_EXIST",
  EMAIL_IS_NOT_VALID: "EMAIL_IS_NOT_VALID",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  ACTIVATED_ERROR: "ACTIVATED_ERROR",

  END_TWEET: "END_TWEET",

  MORE_THAN_TWO_PHOTOS: "MORE_THAN_TWO_PHOTOS",

  UPLOAD_ERROR: "UPLOAD_ERROR",
  UPLOAD_SUCCESS: "UPLOAD_SUCCESS",

  PASSWORD_UPDATE_SUCCESS: "PASSWORD_UPDATE_SUCCESS",
  PASSWORD_UPDATE_ERROR: "PASSWORD_UPDATE_ERROR",
};

export function MsgType(msgType) {
  switch (msgType) {
    case MSG_TYPES.PASSWORD_UPDATE_ERROR:
      return "Please try again";
    case MSG_TYPES.PASSWORD_UPDATE_SUCCESS:
      return "Password updated success";

    case MSG_TYPES.REGISTERED_SUCCESS:
      return "Check your email for activation.";
    case MSG_TYPES.SERVER_ERROR:
      return "Internal server error";
    case MSG_TYPES.USERNAME_EXIST:
      return "Username is taken";
    case MSG_TYPES.EMAIL_EXIST:
      return "Email is taken";

    case MSG_TYPES.LOGIN_SUCCESS:
      return "Login success";
    case MSG_TYPES.INVALID_CREDENTIALS:
      return "Invalid credentials";
    case MSG_TYPES.EMAIL_IS_NOT_VALID:
      return "Email is not valid";
    case MSG_TYPES.ACTIVATED_ERROR:
      return "Activate your account";

    case MSG_TYPES.END_TWEET:
      return "No more tweet.";

    case MSG_TYPES.MORE_THAN_TWO_PHOTOS:
      return "Can't choose more than two photos";

    case MSG_TYPES.UPLOAD_ERROR:
      return "Can't upload now.";
    case MSG_TYPES.UPLOAD_SUCCESS:
      return "Upload success";
    default:
      break;
  }
}
