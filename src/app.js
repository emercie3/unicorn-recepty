const express = require('express');
require('dotenv').config();
const recipeRouter = require('./routes/recipe');
const componentRouter = require('./routes/component');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', recipeRouter);
app.use('/', componentRouter);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && err.type === 'entity.parse.failed') {
    return res.status(400).json({ code: 'invalidDtoIn', error: 'Invalid JSON payload. Check request body syntax.' });
  }
  next(err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
