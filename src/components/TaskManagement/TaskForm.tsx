import { Button, DatePicker, Form, Input, Select, Tag } from 'antd';
import { useModel } from 'umi';
import dayjs from 'dayjs';
import type { Task } from '@/models/taskManagement';

const generateId = () => {
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const TaskForm = () => {
  const { editingTask, isModalVisible, setIsModalVisible, addOrUpdateTask, loadTasks } =
    useModel('taskManagement');
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    const task: Task = {
      id: editingTask?.id || generateId(),
      title: values.title,
      description: values.description,
      deadline: values.deadline ? values.deadline.format('YYYY-MM-DD') : undefined,
      priority: values.priority || 'medium',
      status: editingTask?.status || 'todo',
      tags: values.tags || [],
      createdAt: editingTask?.createdAt || dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };

    addOrUpdateTask(task);
    setIsModalVisible(false);
    form.resetFields();
    loadTasks();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        title: editingTask?.title,
        description: editingTask?.description,
        priority: editingTask?.priority || 'medium',
        deadline: editingTask?.deadline ? dayjs(editingTask.deadline) : undefined,
        tags: editingTask?.tags || [],
      }}
    >
      <Form.Item
        label="Task Name"
        name="title"
        rules={[{ required: true, message: 'Please input task name!' }]}
      >
        <Input placeholder="Enter task name" />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea placeholder="Enter task description" rows={3} />
      </Form.Item>

      <Form.Item label="Deadline" name="deadline">
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Priority" name="priority">
        <Select
          options={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ]}
        />
      </Form.Item>

      <Form.Item label="Tags" name="tags">
        <Select
          mode="tags"
          placeholder="Enter or select tags"
          options={[
            { value: 'work', label: 'Work' },
            { value: 'personal', label: 'Personal' },
            { value: 'urgent', label: 'Urgent' },
            { value: 'important', label: 'Important' },
          ]}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
          {editingTask ? 'Update' : 'Add'} Task
        </Button>
        <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
