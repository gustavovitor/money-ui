const express = require('express');
const app = express();

console.log('[INFO] Express builder.');

app.use(express.static(__dirname + '/dist/money-ui'));
console.log('[INFO] Mapped "/dist" folder.');

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/dist/money-ui/index.html');
  console.log('[INFO] Mapped "/dist/index.html" file.');
});

app.listen(process.env.PORT || 4200);
console.log('[INFO] Server listen on port '+ process.env.PORT || 4200 +'.');
