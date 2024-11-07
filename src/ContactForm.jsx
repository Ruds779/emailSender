import React from "react";
import { useState } from "react";
import axios from "axios";
import { Resend } from "resend";
import email from "./Email";
export default function ContactForm() {
  const [recipient_email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessages] = useState("");
  const [status, setStatus] = useState(null);

  function sendMail() {
    console.log("Sending Email");

    //console.log(`${key}`);
    if (recipient_email && subject && message) {
      localStorage.setItem("email", recipient_email);
      localStorage.setItem("subject", subject);
      localStorage.setItem("message", message);
      axios
        .post("api/", {
          recipient_email: recipient_email,
          subject: subject,
          message: message,
        })
        .then(() => alert("Message Send"))
        .catch(() => alert("Failed To send email"));
      return;
    }

    return alert("Fill in all fields to continue");
  }
  return (
    <>
      <form action="">
        <label
          htmlFor="email"
          className="flex self-center block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          value={recipient_email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          placeholder="username@email.com"
          required
        ></input>
        <div>
          <br />
          <label
            htmlFor="subject"
            className="flex self-center block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
            placeholder="Let us know how we can help you"
            required
          ></input>
        </div>
        <br />
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="flex self-center block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Your message
          </label>
          <textarea
            id="message"
            rows="6"
            value={message}
            onChange={(e) => setMessages(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Leave a comment..."
          ></textarea>
        </div>
        <br />

        <button
          onClick={() => sendMail()}
          className="py-3 px-5 m-10 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Send message
        </button>
      </form>
    </>
  );
}
