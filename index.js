const express = require('express');
const path = require('path');
const app = express();
const PORT = 3005;

// Middleware to serve platform-specific static files
app.use((req, res, next) => {
  const platform = req.headers['platform'];

  let platformDir;
  if (platform === 'pc') {
    platformDir = 'pc';
  } else if (platform === 'android') {
    platformDir = 'android';
  } else {
    return res.status(400).send('Missing or invalid platform header');
  }

  express.static(path.join(__dirname, platformDir))(req, res, next);
});

app.get('/', (req, res) => {
  res.send('AssetBundle Server Running');
});

app.listen(PORT, () => {
  console.log(`AssetBundle server is live at http://localhost:${PORT}`);
});
