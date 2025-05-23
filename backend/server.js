const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const PORT = 5000;

require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

// Middleware
app.use(cors());
app.use(express.json());

// API Route to send SMS
app.post('/send-sms', (req, res) => {
  const { message, to } = req.body;

  client.messages
    .create({
      body: message,
      from: twilioPhone,
      to: to
    })
    .then(message => {
      console.log('Message sent:', message.sid);
      res.json({ success: true, sid: message.sid });
    })
    .catch(error => {
      console.error('SMS Error:', error);
      res.status(500).json({ success: false, error });
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
