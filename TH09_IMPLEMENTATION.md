# Task Management Application (TH09) - Implementation Summary

## Overview

A personal task tracking application built with React, Ant Design, and UMI framework. The application helps users manage their to-do list with a Kanban board interface, dashboard statistics, and table view for detailed task management.

## Features Implemented

### 1. **Dashboard Page** (`/task-management/dashboard`)

- Displays 4 statistical cards:
  - **Total Tasks**: Count of all tasks
  - **Completed Tasks**: Count of finished tasks
  - **In Progress Tasks**: Count of tasks currently being worked on
  - **Overdue Tasks**: Count of tasks past their deadline (excluding completed tasks)
- Quick action button to create new tasks

### 2. **Kanban Board** (`/task-management/kanban`)

- Three-column layout representing task workflow:
  - **To Do**: Tasks not yet started
  - **In Progress**: Tasks currently being worked on
  - **Done**: Completed tasks
- Drag-and-drop functionality using `react-beautiful-dnd`:
  - Move tasks between columns by dragging
  - Visual feedback during drag operations
  - Smooth animations and transitions
- Task cards display:
  - Task title and description preview
  - Priority badge (High/Medium/Low)
  - Deadline with overdue indicator
  - Associated tags
  - Edit and delete buttons

### 3. **Task List Page** (`/task-management/list`)

- Table view with the following columns:
  - Task Name (searchable, sortable)
  - Description (truncated to 50 characters)
  - Status (filterable)
  - Priority (filterable)
  - Deadline (sortable)
  - Tags
  - Created date (sortable)
  - Actions (Edit/Delete)
- Features:
  - **Search**: Filter tasks by name in real-time
  - **Filter**: Filter by status (To Do, In Progress, Done)
  - **Sort**: Sort by name, deadline, and creation date
  - **Pagination**: Display 5-50 tasks per page
  - **Responsive**: Horizontal scroll on smaller screens

### 4. **Task Management Features**

- **Add/Edit Task Form** with fields:
  - Task Name (required)
  - Description (optional)
  - Deadline (optional, with date picker)
  - Priority (Dropdown: High/Medium/Low)
  - Tags (Multi-select)
- **Data Persistence**: All tasks are saved to localStorage
  - Automatic save on each action
  - Data persists across page refreshes
- **Delete Tasks**: Confirmation dialog before deletion
- **Task Status Management**: Move tasks between statuses

## Project Structure

```
src/
├── models/
│   └── taskManagement.ts          # Core model with state management
├── components/
│   └── TaskManagement/
│       ├── TaskForm.tsx            # Form for adding/editing tasks
│       ├── TaskCard.tsx            # Card component for Kanban
│       └── StatCards.tsx           # Statistics cards for dashboard
└── pages/
    └── TaskManagement/
        ├── index.tsx               # Redirect to dashboard
        ├── Dashboard.tsx           # Dashboard page
        ├── KanbanBoard.tsx        # Kanban board page
        └── TaskList.tsx           # Table view page

config/
└── routes.ts                       # Updated with new routes
```

## Technologies Used

- **Frontend Framework**: React 17
- **UI Library**: Ant Design 4.21.0
- **State Management**: UMI useModel hook
- **Drag & Drop**: react-beautiful-dnd 13.1.0
- **Date Management**: dayjs 1.11.20
- **Routing**: UMI router

## Routes Added to config/routes.ts

```javascript
{
  path: '/task-management',
  name: 'Task Management',
  icon: 'CheckSquareOutlined',
  routes: [
    {
      path: '/task-management/dashboard',
      name: 'Dashboard',
      component: './TaskManagement/Dashboard',
    },
    {
      path: '/task-management/kanban',
      name: 'Kanban Board',
      component: './TaskManagement/KanbanBoard',
    },
    {
      path: '/task-management/list',
      name: 'Task List',
      component: './TaskManagement/TaskList',
    },
  ],
}
```

## Data Model

### Task Interface

```typescript
interface Task {
	id: string; // Unique identifier
	title: string; // Task name
	description?: string; // Task description
	deadline?: string; // Due date (YYYY-MM-DD format)
	priority: 'high' | 'medium' | 'low'; // Priority level
	status: 'todo' | 'inprogress' | 'done'; // Current status
	tags?: string[]; // Associated tags
	createdAt: string; // Creation timestamp
}
```

## localStorage Key

- **Key**: `task_management`
- **Format**: JSON array of Task objects
- **Persistence**: Automatic on every change

## Usage Instructions

### Access the Application

1. After running `npm start`, navigate to `http://localhost:8000`
2. Click on "Task Management" in the left sidebar
3. Choose your preferred view:
   - **Dashboard**: Overview of task statistics
   - **Kanban Board**: Visual workflow management
   - **Task List**: Detailed table view

### Create a Task

1. Click "New Task" button on any page
2. Fill in the task details (name, description, deadline, priority, tags)
3. Click "Add Task" to save

### Edit a Task

1. Click the edit icon (✎) on a task card or table row
2. Update the task details
3. Click "Update Task"

### Delete a Task

1. Click the delete icon (🗑) on a task card or table row
2. Confirm deletion in the popup dialog

### Move Tasks (Kanban Board)

1. Drag a task card from one column to another
2. The task status is updated automatically

### Filter & Search (Task List)

1. Use the search box to find tasks by name
2. Use the status dropdown to filter by status
3. Click table headers to sort by different fields

## Color Scheme

### Priority Colors

- **High**: Red (#f5222d)
- **Medium**: Orange (#faad14)
- **Low**: Green (#52c41a)

### Status Colors

- **To Do**: Blue (#2f54eb)
- **In Progress**: Orange (#faad14)
- **Done**: Green (#52c41a)

## Features Checklist

- ✅ Dashboard with statistics cards (Total, Completed, In Progress, Overdue)
- ✅ Kanban Board with 3 columns (To Do, In Progress, Done)
- ✅ Drag-and-drop between columns
- ✅ Task list with table view
- ✅ Filter by status
- ✅ Search by task name
- ✅ Sort by deadline, name, and creation date
- ✅ Add/Edit task form with all required fields
- ✅ Priority levels (High, Medium, Low)
- ✅ Tags support
- ✅ Deadline tracking with overdue indicators
- ✅ LocalStorage persistence
- ✅ Responsive design
- ✅ Delete tasks with confirmation
- ✅ Real-time updates across all views

## Development Notes

### File Generation Pattern

- ID generation uses timestamp + random string (no external UUID library needed)
- Date formatting uses dayjs library
- All components are functional React components with hooks
- State management uses UMI's useModel pattern

### localStorage Structure

Tasks are stored as a JSON array in localStorage under the key `task_management`:

```javascript
localStorage.getItem('task_management'); // Returns JSON string
JSON.parse(localStorage.getItem('task_management')); // Returns Task[]
```

### Component Reusability

- **TaskForm**: Used in modals across Dashboard, Kanban, and TaskList pages
- **TaskCard**: Used in Kanban board for drag-and-drop
- **StatCards**: Used in Dashboard for displaying statistics

## Future Enhancement Possibilities

- Backend API integration
- User authentication and personal task isolation
- Task filtering by tags
- Recurring tasks
- Task notifications/reminders
- Task templates
- Export to CSV/PDF
- Sharing tasks with team members
- Task dependencies/subtasks

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Submission Checklist

- ✅ Code implemented in base project
- ✅ Features tested and working
- ✅ localStorage persistence verified
- ✅ Git branch: TH09 (as instructed)
- ✅ Ready for deployment

---

**Assignment**: TH09 - Personal Task Management Application **Deadline**: 06/05/2026 - 17:00 **Submission Email**: thanhpq@ptit.edu.vn
