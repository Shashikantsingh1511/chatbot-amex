const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/ask', async (req, res) => {
  try {
    const flaskRes = await axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/generate', // Flask endpoint
      data: req.body,
      responseType: 'stream'
    });

    res.setHeader('Content-Type', 'text/plain');
    flaskRes.data.pipe(res); // stream data to frontend
  } catch (err) {
    console.error("Error contacting backend:", err.message);
    res.status(500).json({ error: "Server error." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Frontend running at http://localhost:${PORT}`);
});
