import mongoose, { Types } from "mongoose";


const taskSchema = new mongoose.Schema(
  {
    taskname :{
      type : mongoose.Schema.Types.String,
      require : [true , "Enter a Task"]
    },
    taskdate:{
      type :mongoose.Schema.Types.Date,
      require : true
    }
  });

export const task = mongoose.model('task',taskSchema);
