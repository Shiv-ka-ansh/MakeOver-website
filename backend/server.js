// require('dotenv').config();

// const express = require('express');
// const app = express();
// const cors = require('cors');
// const nodemailer = require('nodemailer');

// app.use(cors({
//   origin: [
//     "https://makeover-website2.onrender.com",
//     "https://makeover-website.onrender.com",
//     "http://localhost:5000",
//     "http://127.0.0.1:5500"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true,
// }));

// app.use(express.json());

// // Health check endpoint
// app.get('/', (req, res) => {
//     res.json({ status: 'ok', message: 'API is running' });
// });

// app.get('/contact', (req, res) => {
//     res.json({ status: 'ok', message: 'Contact endpoint is reachable' });
// }
// );

// // Validate environment variables on startup
// const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASS'];
// const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
// if (missingVars.length > 0) {
//     console.error('❌ Missing required environment variables:', missingVars.join(', '));
//     console.error('Please create a .env file with EMAIL_USER and EMAIL_PASS');
// }

// // Create reusable transporter
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// // Test SMTP connection on startup
// transporter.verify()
//     .then(() => console.log('✅ SMTP connection verified'))
//     .catch(err => console.error('❌ SMTP connection error:', err.message));

// // Contact form endpoint
// app.post('/contact', async (req, res) => {
//     try {
//         const { firstName, lastName, email, phone, service, date, message } = req.body;

//         // Validate required fields
//         if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !phone?.trim()) {
//             return res.status(400).json({ 
//                 success: false, 
//                 error: 'Missing required fields' 
//             });
//         }

//         // Sanitize and format data for email
//         const fullName = `${firstName.trim()} ${lastName.trim()}`;
//         const sanitizedService = service || 'No service specified';
//         const sanitizedDate = date?.trim() || 'No date specified';
//         const sanitizedMessage = message?.trim() || 'No message provided';

//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: process.env.EMAIL_TO || process.env.EMAIL_USER,
//             replyTo: email.trim(),
//             subject: `New Booking Request: ${sanitizedService} - ${fullName}`,
//             text: `
// Name: ${fullName}
// Email: ${email.trim()}
// Phone: ${phone.trim()}
// Service: ${sanitizedService}
// Preferred Date: ${sanitizedDate}
// Message: ${sanitizedMessage}
//             `,
//             html: `
//                 <h2>New Booking Request</h2>
//                 <p><strong>Name:</strong> ${fullName}</p>
//                 <p><strong>Email:</strong> ${email.trim()}</p>
//                 <p><strong>Phone:</strong> ${phone.trim()}</p>
//                 <p><strong>Service:</strong> ${sanitizedService}</p>
//                 <p><strong>Preferred Date:</strong> ${sanitizedDate}</p>
//                 <p><strong>Message:</strong></p>
//                 <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
//             `.trim()
//         };

//         const info = await transporter.sendMail(mailOptions);
//         console.log('✅ Email sent:', info.messageId);
        
//         res.json({ 
//             success: true, 
//             message: 'Thank you! Your booking request has been sent.' 
//         });
//     } catch (err) {
//         console.error('❌ Error sending email:', err);
//         res.status(500).json({ 
//             success: false, 
//             error: 'Failed to send email. Please try again later.' 
//         });
//     }
// });


// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//     console.log(`Server listening on port ${port} \n http://localhost:${port}`);
// })

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();

// ✅ Middleware
app.use(cors({
  origin: [
    "https://makeover-website2.onrender.com",
    "https://makeover-website.onrender.com",
    "http://localhost:5000",
    "http://127.0.0.1:5500",
    "https://makeoverbyreet.com/",
    "www.makeoverbyreet.com",
    "http://makeoverbyreet.com"
    
  ],
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
}));
app.use(express.json());

// ✅ Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'API is running with Resend' });
});

app.get('/contact', (req, res) => {
  res.json({ status: 'ok', message: 'Contact endpoint is reachable' });
});

// ✅ Contact form endpoint
app.post('/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, service, date, message } = req.body;

    // Validate input
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !phone?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    const sanitizedService = service || 'No service specified';
    const sanitizedDate = date?.trim() || 'No date specified';
    const sanitizedMessage = message?.trim() || 'No message provided';

    // ✅ Send email using Resend API
    await resend.emails.send({
      from: 'MakeOver <onboarding@resend.dev>',
      to: process.env.EMAIL_TO || 'your@email.com', // fallback
      reply_to: email.trim(),
      subject: `New Booking Request: ${sanitizedService} - ${fullName}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email.trim()}</p>
        <p><strong>Phone:</strong> ${phone.trim()}</p>
        <p><strong>Service:</strong> ${sanitizedService}</p>
        <p><strong>Preferred Date:</strong> ${sanitizedDate}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
      `.trim()
    });

    console.log('✅ Email sent via Resend');
    res.json({
      success: true,
      message: 'Thank you! Your booking request has been sent.'
    });

  } catch (err) {
    console.error('❌ Resend error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later.'
    });
  }
});

// ✅ Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
