class Uncompleted{
    constructor(title, description, deadline){
        this.title = title;
        this.description = description;
        this.deadline = deadline;
    }

    static getAll(){
        let allIncomplete = localStorage.getItem("incomplete");
        return JSON.parse(allIncomplete)?? [];

    }

    addNewcompleteTask(newTask){
        let allIncomplete = Uncompleted.getAll();
        allIncomplete.push(newTask);
        Uncompleted.saveTasksToStorage(allIncomplete);
        return newTask;
    }

    static getSingleUncompletedTaskById(id){
        let all = Uncompleted.getAll();
        return all[id];
    }

    static deleteTask(id){
        
        let allTasks = Uncompleted.getAll();
        allTasks.splice(id,1);
        Uncompleted.saveTasksToStorage(allTasks);

    }

    static editTask(id,values){
        let allTasks = Uncompleted.getAll();
        
        allTasks.splice(id,1,values)
        Uncompleted.saveTasksToStorage(allTasks);
        
    }

    static saveTasksToStorage(allTasks){
        localStorage.setItem("incomplete", JSON.stringify(allTasks))
    }
}




export {Uncompleted}