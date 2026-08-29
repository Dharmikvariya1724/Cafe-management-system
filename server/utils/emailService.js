const nodemailer = require('nodemailer');

function createTransporter() {
  const host = process.env.MAIL_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.MAIL_PORT || '587');
  const user = process.env.MAIL_USER || '';
  const pass = process.env.MAIL_PASS || '';

  if (!user || !pass) {
    console.warn('[Email Service Warning] SMTP credentials (MAIL_USER/MAIL_PASS) not configured in server/.env');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: user && pass ? { user, pass } : undefined,
    tls: {
      rejectUnauthorized: false
    }
  });
}

async function sendReservationConfirmationEmail(reservation) {
  try {
    const transporter = createTransporter();
    const fromAddress = process.env.MAIL_FROM_ADDRESS || 'reservations@coffeeking.in';
    const fromName = process.env.MAIL_FROM_NAME || 'Coffee King Surat';

    const mailOptions = {
      from: `"${fromName}" <${fromAddress}>`,
      to: reservation.email,
      subject: `🎉 Table Reservation Confirmed! - ${reservation.id.toUpperCase()}`,
      text: `Hello ${reservation.name},\n\nYour table reservation at Coffee King Surat is CONFIRMED!\n\nDetails:\nDate: ${reservation.date}\nTime: ${reservation.time}\nGuests: ${reservation.guests}\nReservation ID: ${reservation.id}\n\nWe look forward to hosting you!\n\nBest regards,\nCoffee King Team`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f9f6f0; margin: 0; padding: 20px; color: #2b2b2b; }
            .card { max-width: 550px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e6ded2; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .header { background: #6b3e2e; color: #ffffff; padding: 25px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; font-weight: 800; }
            .header p { margin: 5px 0 0; font-size: 13px; opacity: 0.9; }
            .body { padding: 30px 25px; }
            .greeting { font-size: 16px; font-weight: 700; color: #6b3e2e; margin-bottom: 12px; }
            .info-box { background: #faf6f0; border-left: 4px solid #6b3e2e; padding: 15px 20px; border-radius: 8px; margin: 20px 0; }
            .info-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }
            .info-row:last-child { margin-bottom: 0; }
            .label { font-weight: 600; color: #777; }
            .value { font-weight: 700; color: #222; }
            .badge { display: inline-block; background: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; }
            .footer { background: #f4efe6; padding: 15px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eae3d7; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1>☕ COFFEE KING SURAT</h1>
              <p>Table Reservation Confirmation</p>
            </div>
            <div class="body">
              <div class="greeting">Hello ${reservation.name},</div>
              <p style="font-size: 14px; line-height: 1.5; color: #444;">
                Great news! Your table reservation request has been officially <strong>CONFIRMED</strong> by our team. We are preparing a table for you!
              </p>
              
              <div class="info-box">
                <div style="margin-bottom: 12px; text-align: right;">
                  <span class="badge">STATUS: CONFIRMED</span>
                </div>
                <div class="info-row"><span class="label">Reservation ID:</span> <span class="value">${reservation.id}</span></div>
                <div class="info-row"><span class="label">Guest Name:</span> <span class="value">${reservation.name}</span></div>
                <div class="info-row"><span class="label">Date:</span> <span class="value">${reservation.date}</span></div>
                <div class="info-row"><span class="label">Time Slot:</span> <span class="value">${reservation.time}</span></div>
                <div class="info-row"><span class="label">Guests:</span> <span class="value">${reservation.guests} Guests</span></div>
                ${reservation.specialRequests ? `<div class="info-row"><span class="label">Requests:</span> <span class="value">${reservation.specialRequests}</span></div>` : ''}
              </div>

              <p style="font-size: 13px; color: #666; line-height: 1.5;">
                If you need to change your reservation timing or guest count, please contact us directly at <strong>+91 74050 21433</strong>.
              </p>
            </div>
            <div class="footer">
              Coffee King Surat • Adajan, Vesu, Katargam & Pal<br/>
              Stirr Your Heart In • www.coffeeking.in
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('[Email Service Success] Reservation confirmation sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[Email Service Error] Failed to send reservation email:', error.message || error);
    return { success: false, error: error.message };
  }
}

module.exports = {
  sendReservationConfirmationEmail
};
