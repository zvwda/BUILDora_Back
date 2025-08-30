const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // من .env
    pass: process.env.EMAILPASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

router.post("/sendEmail", async (req, res) => {
  const { to, emailData } = req.body;
  const subject = emailData.subject;
  const text = emailData.text;
  if (!Array.isArray(to) || !subject || !text) {
    return res
      .status(400)
      .json({ error: "Missing fields or 'to' is not an array" });
  }

  try {
    const results = await Promise.all(
      to.map((email) => {
        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject,
          text,
        };
        return transporter.sendMail(mailOptions);
      })
    );

    console.log("All emails sent:", results);
    res.status(200).send("All emails sent successfully");
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).send("Failed to send one or more emails");
  }
});

module.exports = router;
