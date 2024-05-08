export const sendPassword = `<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Password</title>
</head>

<body>
  <h2>Your Password</h2>
  <p>Hello,</p>
  <p>Here is your password:</p>
  <p><strong>[PASSWORD]</strong></p>
  <p>Please keep this password confidential and do not share it with anyone.</p>
  <p>Thank you!</p>
</body>

</html>`

export const sendOtp = `<html>

<head>
  <meta charset="UTF-8">
  <title>OTP Verification</title>
</head>
<body>
  <h2>OTP Verification</h2>
  <p>Dear user,</p>
  <p>Your One-Time Password (OTP) for verification is: <strong>[OTP]</strong></p>
  <p>Please click on the below link to complete the process.</p>
  <p>If you did not initiate this request, please disregard this message.</p>
</body>
</html>`


export const emailEmailVerification = `Subject: Action Required - OTP Verification

To secure your account, we require OTP verification.

Please use the following OTP: [OTP]

Thank you,`