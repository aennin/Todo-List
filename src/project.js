import { displayProject } from "./display";
import { saveProjects, loadProjects, deleteProject } from "./storage";

let projects = loadProjects();

// Load saved projects on page load
window.addEventListener("DOMContentLoaded", () => {
    projects.forEach(project => displayProject(project));
});

const addProject = document.getElementById("add-project");
const projectDialog = document.getElementById("project-dialog");
const projectForm = document.getElementById("project-form");


// Create new project
projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;

    projects.push(title);
    saveProjects(projects); // Save to localStorage

    displayProject(title);
    projectDialog.close();
    projectForm.reset();
});

addProject.addEventListener("click", () =>{
    projectDialog.showModal(); // open dialog

})

// Cancel project
const cancelProject = document.getElementById("cancel-project");
cancelProject.addEventListener("click", () =>{
    const cancelProjectDialog = document.getElementById("cancel-dialog");
    projectDialog.close();
    cancelProjectDialog.showModal();

    const yes = document.getElementById("cancel-yes");
    const no = document.getElementById("cancel-no");

    yes.addEventListener("click", () => {
        cancelProjectDialog.close();
        projectDialog.close();
    })

    no.addEventListener("click", () => {
        cancelProjectDialog.close();
        projectDialog.showModal();
    })
    
})