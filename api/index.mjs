import express from "express";
import { Resend } from "resend";

const app = express();
app.use(express.urlencoded({ extended: true }));
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendResend({ recipient_email, subject, message }) {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: recipient_email,
    subject: subject,
    html: message,
  });

  if (error) {
    console.error("Error:", error);
    return { success: false, error };
  }

  console.log("Email Sent:", data);
  return { success: true, data };
}

// Root endpoint for GET
app.get("/", (req, res) => res.send("Express on Vercel"));

// POST endpoint to send email
app.post("/sendResend", async (req, res) => {
  try {
    const response = await sendResend(req.body);
    if (response.success) {
      res.send(response.data);
    } else {
      res.status(500).send(response.error);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Start the server on port 3000
app.listen(3000, () => console.log("Server ready on port 3000."));

// Export the app for serverless environments like Vercel
export default app;
