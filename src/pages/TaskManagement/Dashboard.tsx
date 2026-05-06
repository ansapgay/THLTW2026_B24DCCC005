import { Button, Modal, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import { useEffect } from 'react';
import StatCards from '@/components/TaskManagement/StatCards';
import TaskForm from '@/components/TaskManagement/TaskForm';

const TaskDashboard: React.FC = () => {
  const {
    loadTasks,
    getDashboardStats,
    setIsModalVisible,
    setEditingTask,
    isModalVisible,
  } = useModel('taskManagement');

  const stats = getDashboardStats();

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateTask = () => {
    setEditingTask(undefined);
    setIsModalVisible(true);
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Task Dashboard</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateTask} size="large">
          New Task
        </Button>
      </div>

      <StatCards stats={stats} />

      <Modal
        title={`${''} Task`}
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose
      >
        <TaskForm />
      </Modal>
    </div>
  );
};

export default TaskDashboard;
