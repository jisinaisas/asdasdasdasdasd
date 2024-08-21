const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const pastebinId = req.query.id;
  const pastebinPath = path.join(__dirname, '../data/pastebin.json');

  if (fs.existsSync(pastebinPath)) {
    const pastebins = JSON.parse(fs.readFileSync(pastebinPath, 'utf-8'));
    const paste = pastebins.find(p => p.id === pastebinId);

    if (paste) {
      res.status(200).send(paste.content);
    } else {
      res.status(404).send('Pastebin not found');
    }
  } else {
    res.status(404).send('No pastebins available');
  }
};
