const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  if (req.method === 'POST') {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      const content = JSON.parse(data).content;
      const pastebinId = Math.random().toString(36).substr(2, 9);
      const pastebinPath = path.join(__dirname, '../data/pastebin.json');

      let pastebins = [];
      if (fs.existsSync(pastebinPath)) {
        pastebins = JSON.parse(fs.readFileSync(pastebinPath, 'utf-8'));
      }

      pastebins.push({ id: pastebinId, content });
      fs.writeFileSync(pastebinPath, JSON.stringify(pastebins, null, 2));
      res.status(200).json({ id: pastebinId, url: `/raw/${pastebinId}` });
    });
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
