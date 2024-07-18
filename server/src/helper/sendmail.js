const nodemailer = require("nodemailer");
const sendMail = async (email, digiritRandom) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "locnt@bsscommerce.com",
      pass: "Nguyenloc2001",
    },
  });

  const mailOptions = {
    from: "MJob Admin",
    to: email,
    subject: "You're already request to take money",
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

module.exports = { sendMail };
