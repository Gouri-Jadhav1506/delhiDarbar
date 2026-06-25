import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const fromName = process.env.SMTP_FROM_NAME || "Spice n Bliss";
    const fromEmail = process.env.SMTP_FROM_EMAIL || "noreply@spicenbliss.com";

    let transporter;
    let isTestAccount = false;
    let testUser = "";

    if (smtpHost && smtpUser && smtpPass) {
      // Configure real SMTP server
      const port = Number(smtpPort) || 587;
      transporter = nodemailer.createTransport({
        host: smtpHost,
        port: port,
        secure: port === 465, // true for 465, false for other ports
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });
    } else {
      // Fallback: Create test Ethereal account
      isTestAccount = true;
      try {
        const testAccount = await nodemailer.createTestAccount();
        testUser = testAccount.user;
        transporter = nodemailer.createTransport({
          host: testAccount.smtp.host,
          port: testAccount.smtp.port,
          secure: testAccount.smtp.secure,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });
      } catch (err) {
        console.error("Failed to create Ethereal test account:", err);
        return NextResponse.json(
          {
            success: false,
            message: "Unable to process subscription at this moment. Please try again later.",
          },
          { status: 500 }
        );
      }
    }

    // Professional, on-brand HTML email template matching Skyline theme
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to Spice n Bliss</title>
          <style>
            body {
              background-color: #0D2221;
              color: #B4C4C4;
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              margin: 0;
              padding: 0;
              -webkit-font-smoothing: antialiased;
            }
            .wrapper {
              width: 100%;
              background-color: #0D2221;
              padding: 40px 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #102B2A;
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 24px;
              overflow: hidden;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }
            .header {
              padding: 40px 40px 20px 40px;
              text-align: center;
              border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            }
            .logo-text {
              font-size: 24px;
              font-weight: bold;
              letter-spacing: 1px;
              color: #ffffff;
              margin: 0;
            }
            .logo-sub {
              font-size: 10px;
              text-transform: uppercase;
              letter-spacing: 3px;
              color: #FFD84D;
              margin-top: 5px;
              display: block;
            }
            .content {
              padding: 40px;
              line-height: 1.6;
            }
            h1 {
              color: #ffffff;
              font-size: 22px;
              margin-top: 0;
              margin-bottom: 20px;
              font-weight: 600;
            }
            p {
              font-size: 15px;
              color: #B4C4C4;
              margin-bottom: 20px;
            }
            .highlight {
              color: #FFD84D;
              font-weight: bold;
            }
            .cta-button {
              display: inline-block;
              background-color: #FFD84D;
              color: #102B2A !important;
              text-decoration: none;
              padding: 12px 30px;
              font-size: 13px;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 2px;
              border-radius: 50px;
              margin-top: 10px;
              margin-bottom: 20px;
              transition: background-color 0.3s;
            }
            .cta-button:hover {
              background-color: #ffe073;
            }
            .footer {
              padding: 30px 40px;
              background-color: #0D2221;
              border-top: 1px solid rgba(255, 255, 255, 0.05);
              text-align: center;
              font-size: 12px;
              color: rgba(180, 196, 196, 0.4);
            }
            .footer a {
              color: #FFD84D;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header">
                <h2 class="logo-text">Spice n Bliss</h2>
                <span class="logo-sub">Curated Accessories</span>
              </div>
              <div class="content">
                <h1>Welcome to our Circle of Bliss!</h1>
                <p>Hello,</p>
                <p>Thank you for subscribing to the <span class="highlight">Spice n Bliss</span> newsletter. You are now part of an exclusive group of connoisseurs of handcrafted accessories and statement pieces.</p>
                <p>As a member, you will receive:</p>
                <ul style="color: #B4C4C4; font-size: 15px; padding-left: 20px; margin-bottom: 30px;">
                  <li style="margin-bottom: 10px;">Early access to new capsule drops and collections.</li>
                  <li style="margin-bottom: 10px;">Exclusive subscribers-only preview access to limited items.</li>
                  <li style="margin-bottom: 10px;">Artisan stories and design philosophy behind our handpicked pieces.</li>
                </ul>
                <div style="text-align: center;">
                  <a href="https://delhidarbargroup.com/spicenbliss" class="cta-button" target="_blank">Explore The Shop</a>
                </div>
                <p>We are delighted to have you join us on this journey of fine craft and style.</p>
                <p>Warmest regards,<br><span class="highlight">The Spice n Bliss Team</span><br><span style="font-size: 12px; color: rgba(180, 196, 196, 0.6);">Delhi Darbar Group</span></p>
              </div>
              <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Spice n Bliss (Delhi Darbar Group). All Rights Reserved.</p>
                <p>If you did not request this subscription, you can safely ignore this email.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const mailOptions = {
      from: `"${fromName}" <${isTestAccount ? testUser : fromEmail}>`,
      to: email,
      subject: "Welcome to Spice n Bliss! ✨",
      text: `Welcome to Spice n Bliss!\n\nThank you for subscribing to our newsletter. We are delighted to have you join our circle of bliss.\n\nExplore our latest collections: https://delhidarbargroup.com/spicenbliss\n\nWarmest regards,\nThe Spice n Bliss Team\nDelhi Darbar Group`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);

    let previewUrl = null;
    if (isTestAccount) {
      previewUrl = nodemailer.getTestMessageUrl(info);
      console.log("-----------------------------------------");
      console.log(`[Ethereal Email] Sent to: ${email}`);
      console.log(`[Ethereal Email] Preview URL: ${previewUrl}`);
      console.log("-----------------------------------------");
    }

    return NextResponse.json({
      success: true,
      message: isTestAccount
        ? "Successfully joined! (Ethereal test mail sent)"
        : "Successfully joined! A confirmation email has been sent to your inbox.",
      previewUrl,
    });
  } catch (error: any) {
    console.error("Subscription email error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email confirmation. Please check your setup and try again.",
      },
      { status: 500 }
    );
  }
}
