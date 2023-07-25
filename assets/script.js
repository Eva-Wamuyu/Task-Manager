import { Uncompleted } from "./uncompleted.js";
import { CompletedTask } from "./completed.js";


let form = document.querySelector(".form");
let form2 = document.querySelector(".form2");
let index_;
document.querySelector("#add-task").onclick = ()=>{
    form.style.display = "block";

}
document.querySelector("#close").onclick = ()=>{
    form.style.display = "none";

}
document.querySelector("#close1").onclick = ()=>{
    form2.style.display = "none";

}
function getTimeAndFormatIt() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function renderDateMin(){
    const input = document.createElement("input");
    const input2 = document.createElement("input");

    input.type = 'datetime-local';
    input2.type = 'datetime-local';
    input.id = 'deadline';
    input2.id = 'deadline';
    input.min = getTimeAndFormatIt();
    input2.min = getTimeAndFormatIt();

    document.querySelector('.deadline-container').appendChild(input)
    document.querySelector('.deadline2-container').appendChild(input2)
    
}

renderDateMin()


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let description = document.querySelector("#description");
    let title = document.querySelector("#title");
    let deadline = document.querySelector("#deadline");

    
    
    if(description.value != "" && title.value != "" && deadline.value != "" ){
        let newTask = new Uncompleted(description.value,title.value,deadline.value);
        newTask.addNewcompleteTask(newTask);

        form.reset();
        renderIncompleteTasks();
        form.style.display = "none";
    }
    else{
        alert("All Inputs Are Needed ");
    }
    
});



function renderCompleteTasks(){
    let allCompleted = CompletedTask.getAllCompleted();
    let container = document.querySelector(".complete-list");

    let html = "";
    let p;

    if(allCompleted.length > 0){
    allCompleted.forEach((element,index) => {
        if( calculateElapsedDays(element.timeCompleted,element.deadline)< 0){
           p = `<p>
       
           ${calculateElapsedDays(element.timeCompleted,element.deadline) *-1} Days Past Deadline
           </p>`
 
        }
        else{
            p = `<p>
            ${calculateElapsedDays(element.timeCompleted,element.deadline) } 
           Days Before Deadline
            </p>`

        }
        html+=`
        <li class="task">
        <h3>${element.title}</h3>
        <p>
        ${element.description}
        </p>
        <p>
        ${element.deadline}
        </p>
        <p>
              ${p}
        </p>

        <div>
           
            <button class="delete-button-complete" >
                 Delete
            </button>
            
        </div>
    </li>
        ` 
    });
    }
    else{
        html = "<li> No Completed Tasks At the Moment </li>";
    }
    container.innerHTML = html;
    let deleteButtons = document.querySelectorAll(".delete-button-complete");
  

    deleteButtons.forEach(
        (button, index)=>{
            button.addEventListener("click", ()=>{
            CompletedTask.deleteCompleteTask(index);
            renderCompleteTasks();
        })
    }
)
  
   
    

};
function renderIncompleteTasks(){
    let allIncompleteTasks = Uncompleted.getAll();
    let container = document.querySelector(".not-complete");
    let html = "";
    
    if(allIncompleteTasks.length > 0){

    allIncompleteTasks.forEach((element,index) => {
        html+=`
        <li class="task">
        <h3>${element.title}</h3>
        <p>
        ${element.description}
        </p>
        <div class="buttons">
            <button class="complete-button">
                Complete
            </button>
            <button class="edit-button">
                Edit
            </button>
            <button class="delete-button">
               Delete
            </button>
           
        </div>
    </li>
        ` 
    });
    }
    else{
        html +=  "<li>No Pending Task At The Moment </li>"
    }
    container.innerHTML = html;

    let deleteButtons = document.querySelectorAll(".delete-button");
    let completeButtons = document.querySelectorAll(".complete-button");
    let editButtons = document.querySelectorAll(".edit-button");
    deleteButtons.forEach((btn, index) =>{
    btn.addEventListener("click",()=>{
        Uncompleted.deleteTask(index);
        renderIncompleteTasks();
            
    }
    )});


    completeButtons.forEach(
        (button,index) =>{
            button.addEventListener("click",()=>{
                CompletedTask.addTaskAsCompleted(index);
                renderIncompleteTasks();
                renderCompleteTasks();
                
            })
        }

    );

    editButtons.forEach((btn, index) =>{
        btn.addEventListener("click",()=>{
            let theTask = Uncompleted.getSingleUncompletedTaskById(index);
            form2.description.value = theTask.description;
            form2.title.value = theTask.title;
            form2.deadline.value = theTask.deadline;
            form2.style.display = "block";
            index_ = index;
            
            
                
        }
        )})
  
};

form2.addEventListener("submit",(e,id)=>{
    e.preventDefault();
    
    if(form2.title.value != "" && form2.description.value != ""  && form2.deadline.value !=""){
    let edited = new Uncompleted(form2.title.value,form2.description.value,  form2.deadline.value)
    Uncompleted.editTask(index_, edited);
    form2.reset();
    form2.style.display = "none";
    renderIncompleteTasks();
    }
    else{
        alert("All Inputs are needed")
    }
    

})
function calculateElapsedDays(deadline,completed){
    let date = new Date(completed);
    const diff = date - deadline;
   
    return Math.floor(diff/(1000 * 60 * 60 * 24));
     
}



function main(){
    
renderIncompleteTasks();
renderCompleteTasks();

}
main();




   
