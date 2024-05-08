import nodemailer from "nodemailer"
import {config} from "../config/brevo.config"
const sendEmail = async (to,subject,body) => {
    console.log("Sending mail using Brevo credentials");
    try {
      return new Promise((resolve) => {
        var transporter = nodemailer.createTransport({
          // service: 'gmail',
          host: config.HOST,
          secure: false,
          port: config.SMTP_PORT,
          auth: {
            user: config.EMAIL_USER,
            pass: config.EMAIL_PASS,
          },
        });
  
        var mailOptions = {
          from: `Techo <${config.SENDING_FROM}>`,
          to: to,
          subject: subject,
          html: body,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log("Error in transporter.sendMail()", error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        resolve(true);
      });
    } catch (error) {
      console.log("Catch in sendMail==", error);
    }
};

export default sendEmail
