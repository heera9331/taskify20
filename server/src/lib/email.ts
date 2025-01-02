import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "localhost", // Use your SMTP server if it's running on localhost
  port: 587, // Common SMTP port
  secure: false, // Use true for SSL/TLS (port 465)
  auth: {
    user: "artificiallgrass_notify_user", // SMTP username
    pass: "aZDYRBmaV6q5fb26cppD", // SMTP password
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: '"No Reply" <noreply@example.com>',
      to,
      subject,
      html,
    });
    console.log("Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};