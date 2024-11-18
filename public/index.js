
const submitBtn = document.querySelector('.submit');
const taskInput = document.querySelector('.js-tasksInput');
const dateInput = document.querySelector('.js-dateInput');
const taskList = document.querySelector('.task-list');

let dl = '';





getAllTask().then(res=>{
  return dl = document.querySelectorAll('.delete-icon');
}).then(dl=>{
  dl.forEach(icon=>{
    icon.addEventListener('click',(event)=>{
      const targetEl= event.target;
      const parent = targetEl.parentElement;
      const parentDiv = parent.parentElement;
      console.log(parentDiv);
      const taskname = parentDiv.querySelector('.task-name').innerText;
      const taskdate = parentDiv.querySelector('.task-date').innerText;
      const body = {
        taskname,
        taskdate
      }
      deleteTask(body);
      

    });

  });

}).catch(err=>{
  console.log(err);
})








submitBtn.addEventListener('click',(event)=>{
  event.preventDefault();
  const taskname = taskInput.value;
  const taskdate = dateInput.value;

  taskInput.value = '';
  dateInput.value = '';
  
  const obj = {
    taskname,
    taskdate
  }
  
  
  sendRequest(obj);
  getAllTask();
  
  
  
});


async function sendRequest(obj){
  let response;
  try{
    response = await fetch('http://localhost:3000/task/submit' , {
      method :'POST',
      headers :{
        "Content-Type" : 'application/json'
      },
      body : JSON.stringify(obj)
    });
    if (!response.ok) {
      const errorMessage = await response.json(); 
      alert(`Error : ${errorMessage.message}`);
      return;
    }
    
  }
  catch(err){
  }
}


async function getAllTask(){
  let html = '';
  
  try{
    const response = await fetch('http://localhost:3000/task');
    const result = await response.json();
    result.forEach((task,index)=> {
      const date = new Date(task.taskdate);
      const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;

      //const div = document.createElement('div');
      //div.classList.add('task-styling');
      //taskList.appendChild(div);

      // const indexSpan = document.createElement('span');
      // const nameSpan = document.createElement('span');
      // const dateSpan = document.createElement('span');
      // const deleteSpan = document.createElement('span');

      // indexSpan.innerHTML = `${index+1}`;
      // nameSpan.innerHTML = `${task.taskname}`;
      // dateSpan.innerHTML = `${formattedDate}`
      // deleteSpan.innerHTML = deleteIcon;

      // deleteSpan.classList.add('delete-icon');

      // div.appendChild(indexSpan);
      // div.appendChild(nameSpan);
      // div.appendChild(dateSpan);
      // div.appendChild(deleteSpan);

      html+= `<div class = "task-styling"> 
              <span class="task-index">${index+1}</span>
              <span class="task-name">${task.taskname}</span>
              <span class = "task-date">${formattedDate}</span>
              <span class='delete-icon'><i class="fa-solid fa-trash"></i></span>
              </div>`
         
      });
      
      

}
  catch(err){
    console.log(`error : ${err}`);}

  taskList.innerHTML = html ;
  

}


async function deleteTask(obj){

  const response = await fetch('http://localhost:3000/task/delete', {
    method : 'DELETE',
    headers :{
      "Content-Type":"application/json",
    },
    body : JSON.stringify(obj)
  });

  const result = response.status;
  console.log(result);
  getAllTask();
  


  }


