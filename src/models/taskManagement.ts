import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'inprogress' | 'done';
  tags?: string[];
  createdAt: string;
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  inProgressTasks: number;
}

const STORAGE_KEY = 'task_management';
const DEFAULT_TASKS: Task[] = [];

export default () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchText, setSearchText] = useState<string>('');

  // Load tasks from localStorage
  const loadTasks = async () => {
    try {
      const dataLocal = localStorage.getItem(STORAGE_KEY);
      const tasksData = dataLocal ? JSON.parse(dataLocal) : DEFAULT_TASKS;
      setTasks(tasksData);
      return tasksData;
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  };

  // Save tasks to localStorage
  const saveTasks = (tasksToSave: Task[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksToSave));
      setTasks(tasksToSave);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  // Add or update task
  const addOrUpdateTask = (task: Task) => {
    const newTasks = editingTask
      ? tasks.map((t) => (t.id === task.id ? task : t))
      : [...tasks, task];
    saveTasks(newTasks);
  };

  // Delete task
  const deleteTask = (taskId: string) => {
    const newTasks = tasks.filter((t) => t.id !== taskId);
    saveTasks(newTasks);
  };

  // Move task between statuses
  const moveTask = (taskId: string, newStatus: 'todo' | 'inprogress' | 'done') => {
    const newTasks = tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t));
    saveTasks(newTasks);
  };

  // Get filtered tasks
  const getFilteredTasks = () => {
    return tasks.filter((task) => {
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      const matchesSearch = task.title.toLowerCase().includes(searchText.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  };

  // Get dashboard statistics
  const getDashboardStats = (): DashboardStats => {
    const now = dayjs();
    const completedTasks = tasks.filter((t) => t.status === 'done').length;
    const inProgressTasks = tasks.filter((t) => t.status === 'inprogress').length;
    const overdueTasks = tasks.filter((t) => {
      if (t.status === 'done' || !t.deadline) return false;
      return dayjs(t.deadline).isBefore(now);
    }).length;

    return {
      totalTasks: tasks.length,
      completedTasks,
      overdueTasks,
      inProgressTasks,
    };
  };

  // Get tasks by status
  const getTasksByStatus = (status: 'todo' | 'inprogress' | 'done') => {
    return tasks.filter((t) => t.status === status);
  };

  return {
    tasks,
    editingTask,
    isModalVisible,
    filterStatus,
    searchText,
    setTasks,
    setEditingTask,
    setIsModalVisible,
    setFilterStatus,
    setSearchText,
    loadTasks,
    saveTasks,
    addOrUpdateTask,
    deleteTask,
    moveTask,
    getFilteredTasks,
    getDashboardStats,
    getTasksByStatus,
  };
};
