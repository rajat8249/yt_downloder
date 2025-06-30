const express = require('express');
const cors = require('cors');
const youtubedl = require('youtube-dl-exec');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/download', async (req, res) => {
  const url = req.body.url;
  if (!url || !url.includes("youtube")) {
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }

  try {
    const info = await youtubedl(url, {
      dumpSingleJson: true
    });

    const format = info.formats.find(f => f.format_id === '18') || info.formats[0];
    res.json({ downloadUrl: format.url });
  } catch (error) {
    console.error("yt-dlp error:", error.message);
    res.status(500).json({ error: "Download failed" });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running on port 3000");
});
