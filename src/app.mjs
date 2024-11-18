import express from 'express';
import mongoose from "mongoose";
import taskRouter from './routes/tasks.mjs';

const app = express();
const port = 3000;

app.use(taskRouter);

mongoose.connect('mongodb://localhost/todoapp')
  .then(result=>{
    console.log('connected to database');

  })
  .catch(err =>console.log(`error : $`));


app.listen(port);