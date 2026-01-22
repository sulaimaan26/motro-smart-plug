require('dotenv').config();
const express = require('express');
const auth = require('./auth.middleware');
const plugService = require('./plug.service');

const app = express();
app.use(express.json());

// 🔐 Protected routes
app.use(auth);

// Turn ON
app.post('/on', async (req, res) => {
  try {
    await plugService.setPower(true);
    res.json({ status: 'ON' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Turn OFF
app.post('/off', async (req, res) => {
  try {
    await plugService.setPower(false);
    res.json({ status: 'OFF' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Optional: status check
app.get('/status', async (req, res) => {
  try {
    const state = await plugService.getStatus();
    res.json({ power: state ? 'ON' : 'OFF' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Smart Plug API running on port ${PORT}`);
});
