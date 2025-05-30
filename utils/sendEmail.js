import nodemailer from "nodemailer";

const sendEmail = async (to, weatherMessage) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Daily Weather Report",
    text: weatherMessage,
  };

  return transporter.sendMail(mailOptions);
};

export default sendEmail;
