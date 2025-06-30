const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/download', (req, res) => {
  const url = req.body.url;
  if (!url || !url.includes("youtube")) {
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }

  exec(`yt-dlp -f best -g "${url}"`, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ error: "Download failed" });
    }
    res.json({ downloadUrl: stdout.trim() });
  });
});

app.listen(3000, () => {
  console.log("✅ Server running on port 3000");
});
