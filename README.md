# Todo-List

A responsive and interactive To-Do List web application that allows users to create, organize, and manage tasks by project and due date. Built using vanilla JavaScript, HTML, and CSS as part of the odin project (https://www.theodinproject.com) curriculum.

## Features
- **Project Management**
    - Create multiple projects to organize tasks
    - Delete projects when no longer needed

- **Task Management**
    - Add tasks with name, due date, priority, and notes
    - Edit existing tasks
    - Delete tasks with confirmation dialog
    - Toggle task completion status
    - Collapsible task details view

- **Data Persistence**
    - All data saved to localStorage
    - Projects and tasks persist between sessions

- **User-Friendly Interface**
    - Clean, intuitive design
    - Responsive layout
    - Confirmation dialogs for destructive actions

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6)
- Webpack for bundling and development
- Git & GitHub for version control
- localStorage (for data persistence)
- Dialog API (for modal dialogs)

## Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/aennin/Todo-List.git
   cd todo-list

2. **Install dependencies**
    ```bash
    npm install

3. **Run the development server**
    ```bash
    npm start

4. **Build for production**
    ```bash
    npm run build

## Project Structure
```
├── src/
│   ├── display.js       # Handles DOM updates and rendering
│   ├── index.js         # Main JavaScript entry point
│   ├── project.js       # Project creation and management logic
│   ├── storage.js       # (Planned) Task/project data persistence
│   ├── style.css        # Application styles
│   ├── task.js          # Task creation and management logic
│   └── template.html    # Main HTML layout template
│
├── .gitignore           # Git ignored files (e.g. node_modules)
├── package.json         # Project metadata and dependencies
├── package-lock.json    # Locked dependency versions
├── README.md            # Project documentation
│
├── webpack.common.js    # Shared Webpack config
├── webpack.dev.js       # Development Webpack config
└── webpack.prod.js      # Production Webpack config
```
## Planned Improvements
- Add search and filter functionality
- Add drag-and-drop task reordering
- Implement task categories/tags
- Add dark mode support
- Enable task due date notifications
- Add data export/import functionality

## Acknowledgements
- This project is part of the Odin Project JavaScript Curriculum.