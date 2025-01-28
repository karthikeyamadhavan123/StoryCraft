const nodemailer = require("nodemailer");
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Gmail SMTP server
    port: 587, // Port for TLS/STARTTLS
    secure: false, // false for TLS/STARTTLS, true for SSL (port 465)
    auth: {
        user: process.env.NODEMAILER_EMAIL, // your email from environment variables
        pass: process.env.NODEMAILER_PASS, // your app password from environment variables
    },
});
async function welcomeEmail(email) {
  try {
      const info = await transporter.sendMail({
          from: process.env.NODEMAILER_EMAIL, // sender address
          to: email, // receiver address
          subject: "Welcome to StoryCraft",
          text: `Welcome to StoryCraft! We're excited to have you join our creative community.`, // plain text body
          html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to StoryCraft!</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #6a5acd, #483d8b); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Welcome to StoryCraft!</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! We're thrilled to have you join our growing network of talented creators.</p>
    <p>StoryCraft is the perfect place to showcase your musical and artistic skills. To get started, visit our platform and upload your first audio or video clip:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${process.env.CLIENT_URL}" style="background-color: #6a5acd; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Visit StoryCraft</a>
    </div>
    <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
    <p>Best regards,<br>Your StoryCraft Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>`
      });
      return info;

  } catch (error) {
      console.error("Error sending email: ", error);
  }
}
async function sendVerificationEmail(email, token) {
  try {
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Reset Your StoryCraft Password',
      text: `You requested a password reset for your StoryCraft account. Use this token to reset your password: ${token}`,
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your StoryCraft Password</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(to right, #6366F1, #4F46E5); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Reset Your Tune Share Password</h1>
        </div>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <p>Hello artist</p>
          <p>We received a request to reset your StoryCraft password. If you didn't make this request, you can safely ignore this email.</p>
          <p>To reset your password and get back to sharing your favorite tunes, click the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL}/api/reset-password/${token}" style="background-color: #6366F1; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
          </div>
          <p>This link will expire in 1 hour for security reasons.</p>
          <p>Keep the music playing!<br>The Tune Share Team</p>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
          <p>This is an automated message, please do not reply to this email.</p>
        </div>
      </body>
      </html>
      `
    });
    return info;

  } catch (error) {
    console.error("Error sending email: ", error);
  }
}

async function sendResetEmailSuccessful(email) {
  try {
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Your StoryCraft Password Has Been Reset',
      text: `Your StoryCraft password has been successfully reset. You can now log in with your new password.`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #6366F1, #4F46E5); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Complete!</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello StoryCraft member,</p>
    <p>Great news! Your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #6366F1; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you didn't request this password reset, please contact our support team immediately at support@StoryCraft.com</p>
    <p>To keep your music collection secure, we recommend:</p>
    <ul style="list-style-type: none; padding-left: 0;">
      <li style="margin-bottom: 10px;">🎵 Using a strong, unique password</li>
      <li style="margin-bottom: 10px;">🎸 Enabling two-factor authentication in your account settings</li>
      <li style="margin-bottom: 10px;">🎼 Never sharing your password with others</li>
    </ul>
    <p>You're all set to get back to discovering and sharing amazing music!</p>
    <p>Rock on,<br>The Story CraftTeam</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`
    });

    console.log("Email sent successfully:");

  } catch (error) {
    console.error("Error sending email:", error);
  }
}


async function sendAccountDeletionEmail(email, username) {
  try {
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Your Account Has Been Deleted',
      text: `Dear ${username}, your account has been successfully deleted. We're sorry to see you go.`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Deleted</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f5f7fa;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(to right, #6a1b9a, #8e24aa);
      padding: 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .header h1 {
      color: #fff;
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
    }
    .content p {
      margin: 15px 0;
    }
    .checkmark {
      background-color: #8e24aa;
      color: white;
      width: 60px;
      height: 60px;
      line-height: 60px;
      border-radius: 50%;
      display: inline-block;
      font-size: 36px;
      margin: 20px auto;
    }
    ul {
      padding-left: 20px;
      margin: 20px 0;
    }
    ul li {
      margin-bottom: 10px;
    }
    .footer {
      text-align: center;
      color: #888;
      font-size: 0.9em;
      margin-top: 20px;
    }
    .footer p {
      margin: 5px 0;
    }
    .footer a {
      color: #6a1b9a;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>We're Sad to See You Go</h1>
    </div>
    <div class="content">
      <p>Dear ${username},</p>
      <p>We're writing to confirm that your account has been successfully deleted as per your request.</p>
      <div style="text-align: center;">
        <div class="checkmark">✓</div>
      </div>
      <p>Here's what you need to know:</p>
      <ul>
        <li>Your personal information has been removed from our systems.</li>
        <li>Any remaining account balance has been refunded (if applicable).</li>
        <li>You will no longer receive emails from us, except for this confirmation.</li>
      </ul>
      <p>If you deleted your account by mistake or change your mind, please contact our support team within 30 days, and we may be able to restore your account.</p>
      <p>We appreciate the time you spent with us and hope to see you again in the future.</p>
      <p>Best regards,<br><strong>The StoryCraft Team</strong></p>
    </div>
    <div class="footer">
      <p>This is an automated message, please do not reply to this email.</p>
      <p>Follow us: 
        <a href="https://twitter.com/StoryCraft" target="_blank">Twitter</a> | 
        <a href="https://facebook.com/StoryCraft" target="_blank">Facebook</a> | 
        <a href="https://instagram.com/StoryCraft" target="_blank">Instagram</a>
      </p>
    </div>
  </div>
</body>
</html>
      `
    });

    console.log("Account deletion email sent successfully:");

  } catch (error) {
    console.error("Error sending account deletion email:", error);
  }
}


// module.exports = { sendVerificationEmail, sendResetEmailSuccessful };
module.exports = { welcomeEmail ,sendVerificationEmail,sendResetEmailSuccessful,sendAccountDeletionEmail}