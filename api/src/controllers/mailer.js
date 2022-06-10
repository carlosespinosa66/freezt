const mailer = require('../utils/mailer-setup');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const sendMail = async (req, res) => {
  let { emailToAddress, emailToSubject, emailToBody } = req.body;

  try {
    let info = await mailer.sendMail({
      from: 'E-Commerce Freezt" <freezt@gmail.com>',
      to: emailToAddress,
      subject: emailToSubject,
      html: emailToBody,
    });

    info
      ? res.status(200).send({
          successMsg: 'Mail successfully sent.',
        })
      : res.status(401).send({ errorMsg: "User doesn't" });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const sendMailPassword = async (
  emailToAddress,
  emailToSubject,
  emailToBody
) => {
  let info = await mailer.sendMail({
    from: 'E-commerce Freezt" <freezt@gmail.com>',
    to: emailToAddress,
    subject: emailToSubject,
    html: emailToBody,
  });
};

const sendMailOrder = async (emailToAddress, emailToSubject, emailToBody) => {
  let info = await mailer.sendMail({
    from: 'E-commerce Freezt" <freezt@gmail.com>',
    to: emailToAddress,
    subject: emailToSubject,
    html: emailToBody,
  });
};

const sendMailState = async (emailToAddress, emailToSubject, emailToBody) => {
  let info = await mailer.sendMail({
    from: 'E-commerce Freezt" <freezt@gmail.com>',
    to: emailToAddress,
    subject: emailToSubject,
    html: emailToBody,
  });
};

// const sendMailOrder = async (emailToAddress, emailToSubject, emailToBody) => {
//   const handlebarOptions = {
//     viewEngine: {
//       extName: '.handlebars',
//       // partialsDir: path.resolve('../views'),
//       defaultLayout: '',
//     },
//     viewPath: path.resolve('../views'),
//     extName: '.handlebars',
//   };

//   mailer.use('compile', hbs(handlebarOptions));

//   const mailOptions = {
//     from: 'E-commerce Freezt" <freezt@gmail.com>',
//     to: emailToAddress,
//     subject: emailToSubject,
//     // html: emailToBody,
//     template: 'email',
//     context: {
//       title: 'Title Here',
//       text: 'Lorem ipsum dolor sit amet, consectetur...',
//     },
//   };

//   let info = await mailer.sendMail(
//     (mailOptions,
//     function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     })
//   );
// };

module.exports = {
  sendMail,
  sendMailPassword,
  sendMailOrder,
  sendMailState,
};
