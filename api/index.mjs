const express = require("express");
const app = express();
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendResend() {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["rudsfoon@gmail.com"],
    subject: "Hello World",
    html: "<strong>It works!</strong>",
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
}

app.get("/", (res) => res.send("Express on Vercel"));

app.post("/", (req, res) => {
  sendResend(req.body)
    //sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
