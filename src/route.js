// import express, { Request, Response } from "express";
// import { Resend } from "resend";

// const app = express();
// const resend = new Resend("re_123456789");

// app.get("/", async (req: Request, res: Response) => {
//   const { data, error } = await resend.emails.send({
//     from: "Acme <onboarding@resend.dev>",
//     to: ["rudsfoon@gmail.com"],
//     subject: "hello world",
//     html: "<strong>it works!</strong>",
//   });

//   if (error) {
//     return res.status(400).json({ error });
//   }

//   res.status(200).json({ data });
// });

// app.listen(3000, () => {
//   console.log("Listening on http://localhost:3000");
// });
