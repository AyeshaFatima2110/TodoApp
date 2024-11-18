import {task} from '../mongoose/schema/tasks.mjs';
import {Router} from 'express';
import express from 'express';


const router = Router();
router.use(express.json());
router.use(express.static('./public'));

router.get('/task',async(req,res)=>{
  try{
    const allTask = await task.find({});
    res.send(allTask);}
  catch(err){
    console.log(`error : ${err}`);
    res.sendStatus({message : 'cannot fetch data'});
  }

});

router.post('/task/submit',async(req,res)=>{
  const {body} = req;
  const {taskname , taskdate} = body;
  if(taskname === '' || taskdate===''){
    return res.status(400).json({"message":"feilds must not be empty"});
  }
  else{
    try{
      const newtask = await task.create(body);
      res.sendStatus(200);}
    catch(err){
      console.log('error ',err);}
    }
  
});

export default router;



