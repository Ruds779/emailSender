const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
//const uploadImage = require("./uploadImage.js");
const app = express();
const port = 5000;
const { Resend } = require("resend");
require("dotenv").config();

app.use(cors());
app.use(express.json({ limit: "25mb" }));
//app.use(express.urlencoded({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

//env veriables
var userEmail = process.env.REACT_APP_SENDER_EMAIL;
var userPass = process.env.REACT_APP_APPLICATION_PASSWORD;
const resend = new Resend(process.env.REACT_APP_RESEND_API_KEY);

async function sendResend({ recipient_email, subject, message }) {
  const { data, error } = await resend.emails.send({
    from: "Chris-Law <noreply@chris-law.co.za>",
    to: [recipient_email],
    subject: subject,
    html: message,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
}

function sendEmail({ recipient_email, subject, message }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      host: "mail.puntauto.co.za",
      auth: {
        user: userEmail,
        pass: userPass,
        port: 587,
      },
    });
    const mail_configs = {
      from: process.env.REACT_APP_SENDER_EMAIL,
      to: recipient_email,
      subject: subject,
      html: message,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
}
app.get("/", (req, res) => {
  //sendEmail()
  sendResend()
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});
app.post("/send_email", (req, res) => {
  sendResend(req.body)
    //sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});
app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});
