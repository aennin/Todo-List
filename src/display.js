import { displayProjectTask } from "./task";
import { deleteProject } from "./storage";

export function displayProject(title) {
    const side = document.getElementById("side");

    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");
    projectItem.innerHTML = `
    <h3 class="title-header">${title}</h3>
    <button class="delete-btn">X</button>
    `;

    // Clicking on a project name
    projectItem.addEventListener("click", (e) => {
        if(e.target.classList.contains("delete-btn")) return;
        displayProjectTask(title);
    });

    // Delete project
    const deleteBtn = projectItem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () =>{
        const deleteProjectDialog = document.getElementById("delete-project-dialog");
        deleteProjectDialog.showModal();

        const confirmYes = document.getElementById("delete-yes");
        const confirmNo = document.getElementById("delete-no");

        const handleYes = () => {
            deleteProject(title); // Using storage.js
            projectItem.remove();
            deleteProjectDialog.close();
            confirmYes.removeEventListener("click", handleYes);
            confirmNo.removeEventListener("click", handleNo);
        };

        const handleNo = () => {
            deleteProjectDialog.close()
            confirmYes.removeEventListener("click", handleYes);
            confirmNo.removeEventListener("click", handleNo);
        }

        confirmYes.addEventListener("click", handleYes);
        confirmNo.addEventListener("click", handleNo);
    })

    side.appendChild(projectItem);
}