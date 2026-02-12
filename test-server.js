const express = require('express');
const app = express();
app.use(express.static('public'));
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`server running on http://0.0.0.0:${PORT}`));
