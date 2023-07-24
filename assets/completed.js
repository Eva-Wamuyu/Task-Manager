import { Uncompleted } from "./uncompleted.js";

class CompletedTask extends Uncompleted{


    constructor(title, description,deadline, timeCompleted){
        super(title, description,deadline);
        this.timeCompleted = timeCompleted;
        
    }

    static addTaskAsCompleted(id){
        
        let taskToUpdate = Uncompleted.getSingleUncompletedTaskById(id);
        let newCompletedTask = new CompletedTask(taskToUpdate.title, taskToUpdate.description,taskToUpdate.deadline,Date.now());
        
        let allCompleted = CompletedTask.getAllCompleted();
        allCompleted.push(newCompletedTask);
        Uncompleted.deleteTask(id);
        
        CompletedTask.saveTasksToStorage(allCompleted);
        return newCompletedTask;
    }

    static getAllCompleted(){
        let allCompleted = localStorage.getItem("completed");
        return JSON.parse(allCompleted)?? [];
    }

    static saveTasksToStorage(allTasks){
        localStorage.setItem("completed",JSON.stringify( allTasks));
    }



    static getSingleTaskById(id){
        let all = this.getAllCompleted();
        
        return all[id];
    }

    static deleteCompleteTask(id){
        let allTasks = CompletedTask.getAllCompleted();
        
        allTasks.splice(id,1);
        CompletedTask.saveTasksToStorage(allTasks);

    }
}

export {CompletedTask}