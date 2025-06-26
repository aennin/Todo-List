import {saveTasks, loadTasks} from "./storage.js";

export function displayProjectTask(title) {
    const taskContent = document.getElementById("task-content");
    const taskHeading = document.getElementById("task-heading");
    const taskDialog = document.getElementById("task-dialog");
    const taskList = document.getElementById("task-list");
    const taskForm = document.getElementById("task-form");

    taskContent.innerHTML = "";
    taskList.innerHTML = "";

    // Load existing tasks
    const tasks = loadTasks(title);
    tasks.forEach((task, index) => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        
        // Compact view (initially visible)
        const compactView = document.createElement("div");
        compactView.classList.add("compact-view");
        compactView.innerHTML = `
        <input type="checkbox" id="completed" class="completed" ${task.completed ? "checked" : ""}>
        <span class="task-name"><strong>${task.name}</strong></span>
        <span class="due-date">Due: ${task.dueDate}</span>
        <button class="details-btn">Details</button>
        `
        
        // Expand view (intitially hidden)
        const expandView = document.createElement("div");
        expandView.classList.add("expand-view");
        expandView.style.display = "none";
        expandView.innerHTML = `
        <p>Priority: ${task.priority}</p>
        <p>Notes: ${task.notes}</p>
        <div class="task-actions">
             <button class="edit-task">Edit</button>
             <button class="delete-task">Delete</button>
        </div>
        `;

        // Toggle between views
        compactView.querySelector(".details-btn").addEventListener("click", () => {
            expandView.style.display = expandView.style.display === "none" ? "block" : "none";
        });

        // Edit button
        expandView.querySelector(".edit-task").addEventListener("click", () => {
            // Populate form with task data
            document.getElementById("name").value = task.name;
            document.getElementById("due-date").value = task.dueDate;
            document.getElementById("priority").value = task.priority;
            document.getElementById("notes").value = task.notes;

            // Store which task we're editing
            taskDialog.dataset.editingIndex = index;
            taskDialog.showModal();
        });

        // Delete button
        expandView.querySelector(".delete-task").addEventListener("click", () => {
            const deleteTask = document.getElementById("delete-project-dialog")
            deleteTask.showModal();

            const handleYes = () => {
                tasks.splice(index, 1);
                saveTasks(title, tasks);
                displayProjectTask(title);
                deleteTask.close();
                confirmYes.removeEventListener("click", handleYes);
                confirmNo.removeEventListener("click", handleNo);
            }

            const handleNo = () => {
                deleteTask.close();
                confirmYes.removeEventListener("click", handleYes);
                confirmNo.removeEventListener("click", handleNo);
            }
            const confirmYes = document.getElementById("delete-yes");
            const confirmNo = document.getElementById("delete-no");
            
            confirmYes.addEventListener("click", handleYes);
            confirmNo.addEventListener("click", handleNo);

        });

        taskItem.appendChild(compactView);
        taskItem.appendChild(expandView);
        taskList.appendChild(taskItem);
    });
    
    // Display selected project title + button
    const taskBlock = document.createElement("div");
    taskBlock.classList.add("task");
    taskBlock.innerHTML = `
    <div class="task-header">
    <div><h2>${title}</h2></div>
    <div><button class="add-task-btn">Add Task</button></div>
    </div>
    `;

    // Add task
    taskHeading.innerHTML = `Add task to ${title}`;

    // Open dialog on button click
    const addTask = taskBlock.querySelector(".add-task-btn");
    addTask.addEventListener("click", () =>{
        taskDialog.showModal()
    })

    //AppendTask function 
    taskForm.onsubmit = (e) => {
        e.preventDefault();

        const newTask = {
            name: document.getElementById("name").value,
            dueDate: document.getElementById("due-date").value,
            priority: document.getElementById("priority").value,
            notes: document.getElementById("notes").value
        };

        // Check if we're editing or adding
        const editingIndex = taskDialog.dataset.editingIndex;
        if(editingIndex !== undefined) {
            // Update existing task
            tasks[editingIndex] = newTask;
            delete taskDialog.dataset.editingIndex; // Clear edit state
        } else {
            // Add new task
            tasks.push(newTask)
        }

        saveTasks(title, tasks);

       // Refresh the display
       displayProjectTask(title);

        // Reset form and close dialog
        taskForm.reset();
        taskDialog.close();

    };

    // Cancel button to close dialog
    const cancelTask = document.getElementById("cancel-task");
    cancelTask.addEventListener("click", () => {
        taskDialog.close();
    });

    taskContent.appendChild(taskBlock);

}