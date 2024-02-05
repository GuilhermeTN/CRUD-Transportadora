//criação de envio de email com o token

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dreamlog945@gmail.com',
    pass: 'dreamlog83.',
  },
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'seu_email@gmail.com',
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };