const nodemailer = require('nodemailer');
require('dotenv').config({ path: './.env' });

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    auth: process.env.EMAIL_AUTH,
  },
});

let mailOptions = {
  from: 'herrengt.edouard@gmail.com',
  to: 'joedutexlille59@hotmail.com',
  subject: 'Test envoi Email Node',
  text: 'Email envoyé depuis le back !',
};

transporter.sendMail(mailOptions, function (err, data) {
  if (err) {
    console.log('Error on sending email...', err);
  } else {
    console.log('Email sent...');
  }
});