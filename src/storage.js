// PROJECTS
export function saveProjects(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
}

export function loadProjects() {
    return JSON.parse(localStorage.getItem("projects")) || [];
}

export function deleteProject(title) {
    // Remove project from projects array
    const projects = loadProjects().filter(p => p !== title);
    saveProjects(projects);
    // Remove associated tasks
    localStorage.removeItem(`tasks_${title}`);
}

// TASKS
export function saveTasks(projectTitle, tasks) {
    localStorage.setItem(`tasks_${projectTitle}`, JSON.stringify(tasks));
}

export function loadTasks(projectTitle) {
    return JSON.parse(localStorage.getItem(`tasks_${projectTitle}`)) || [];
}
