let errors = {
  404: {
    status: 404,
    errorCode: "NOT_FOUND",
    error: "Not Found"
  },
  500: {
    status: 500,
    errorCode: "DATABASE_ERROR",
    error: "We are Working on it please try after some time"
  },
  400: {
    status: 400,
    errorCode: "CREDENTIALS_NOT_PROVIDED",
    error: "Credentials Not Provided"
  },
  401: {
    status: 401,
    errorCode: "WRONG_OTP",
    error: "Wrong OTP"
  },
  402: {
    status: 402,
    errorCode: "SENDING_EMAIL_ERROR",
    error: "error in sending email"
  },
  403: {
    status: 403,
    errorCode: "WRONG_PIN",
    error: "pin didn't match"
  },
  406: {
    status: 406,
    errorCode: "TOPICS_NOT_FOUND",
    error: "Topics not found"
  },
  11000: {
    status: 500,
    errorCode: "Registered User",
    error: "You have already registered Please Login for continue"
  },
  101: {
    status: 505,
    errorCode: "Wrong Credentials",
    error: "Your account is not registered with us, Please Registered First"
  },
  102: {
    status: 505,
    errorCode: "Not Verified Till Now",
    error: "Your account is not verified, please try after some time"
  },
  103: {
    status: 505,
    errorCode: "Password not match",
    error: "Please Enter Correct Credentials"
  },
  104: {
    status: 104,
    errorCode: "MOBILE_NOT_FOUND",
    error: "Mobile number not found"
  }
};
export default {
  successResponse: (res, code, resData, message) => {
    res.status(200).json({
      status: "SUCCESS",
      code,
      data: resData,
      message,
      length: resData?.length || 0
    });
  },
  badRequest: (res, code, resData) => {
    res.status(400).json({
      status: "Failure",
      code: code,
      message: resData
    });
  },
  conflictErrorMsgResponse: (res, code, resData) => {
    res.status(409).json({
      status: "ERROR",
      code: code,
      message: resData
    });
  },
  somethingErrorMsgResponse: (res, code, message , data="") => {
    res.status(200).json({
      status: "ERROR",
      code: code,
      message: message,
      data: data
    });
  },
  errorMessageResponse: (res, code, resData) => {
    res.status(200).json({
      status: "ERROR",
      code: code,
      message: resData
    });
  },
  errorResponse: (res, errName) => {
    res.status(errors[errName].status).json({
      error: errors[errName].error,
      errorCode: errors[errName].errorCode
    });
  },
  unAuthorizedErrorMsgResponse: (res, code, message , data="") => {
    res.status(403).json({
      status: "ERROR",
      code: code,
      message: message,
      data: data
    });
  },
  successPdfResponse: (res, resData) => {
    res.pdf(resData);
  }
};