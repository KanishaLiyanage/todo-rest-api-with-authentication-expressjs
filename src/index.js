require('dotenv').config();
const express = require('express');
require('./db/mongoose');
const userRouter = require('../src/routers/user');
const taskRouter = require('../src/routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //Automatically parse incoming JSON to an object, so we can access in our request handlers.
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
