const nodemailer = require("nodemailer");
const sendMailOTP = async (
  email,
  digiritRandom,
  message = "You're already request to take money"
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ducdmhe176494@fpt.edu.vn",
      pass: "nheb jwhj cjzl cqjb",
    },
  });

  const mailOptions = {
    from: "MJob Admin",
    to: email,
    subject: message,
    text: "This is a test email from Node.js!",
    html: `<p>This is the code for it! <b>${digiritRandom}</b></p>`,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return false;
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return true;
  });
};

const sendMailActivateAccount = async (email, linkActive) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ducdmhe176494@fpt.edu.vn",
      pass: "nheb jwhj cjzl cqjb",
    },
  });

  const mailOptions = {
    from: "MJob Admin",
    to: email,
    subject: "You're already register account on system",
    text: "This is a test email from Node.js!",
    html: `<p>Thank you for use our system click <a target='_blank' href='${linkActive}'>here</a> to active your account!</p>`,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return false;
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return true;
  });
};

module.exports = { sendMailOTP, sendMailActivateAccount };
