const nodemailer = require("nodemailer");

const EMAIL_TYPES = {
  ACCOUNT_ACTIVATION: "account_activation",
  FORGOT_PASSWORD: "forgot_password",
  TWEET_SHARED: "tweet_shared",
};

var transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

function sendEmail(emailType, toEmail, params) {
  let subject, htmlContent;

  switch (emailType) {
    case EMAIL_TYPES.ACCOUNT_ACTIVATION:
      subject = "Account Activation";
      htmlContent = `
        <html>
          <head></head>
          <body>
            <h1>Account Activation</h1>
            <p>Click the link below to activate your account:</p>
            <a href="${process.env.WEBSITE}/activateAccount/${toEmail}/${params}">Activate Account</a>
          </body>
        </html>
      `;
      break;

    case EMAIL_TYPES.FORGOT_PASSWORD:
      subject = "Forgot Password";
      htmlContent = `
        <html>
          <head></head>
          <body>
            <h1>Forgot Password</h1>
            <p>Click the link below to reset your password:</p>
            <a href="${process.env.WEBSITE}/reset-password/${params}">Reset Password</a>
          </body>
        </html>
      `;
      break;
    case EMAIL_TYPES.TWEET_SHARED:
      subject = "Tweet Shared Successfully";
      htmlContent = `
        <html>
          <head></head>
          <body>
            <h1>Tweet Shared Successfully</h1>
            <p>Click the link below to reset your password:</p>
            <a href="${process.env.WEBSITE}/reset-password/${params}">View your tweet</a>
          </body>
        </html>
      `;
      break;
    default:
      return Promise.reject("Invalid email type");
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: toEmail,
    subject: subject,
    html: htmlContent,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = {
  sendEmail,
};
