const express = require('express');
const app = express();
const reportsRouter = require('./routes/reports');
require('dotenv').config();

app.use('/api/reports', reportsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});