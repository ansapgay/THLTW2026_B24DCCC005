import { Button, Modal, Table, Space, Tag, Input, Select, Card, Row, Col, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import TaskForm from '@/components/TaskManagement/TaskForm';
import type { Task } from '@/models/taskManagement';
import type { ColumnsType } from 'antd/es/table';

const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
  const colors = {
    high: '#f5222d',
    medium: '#faad14',
    low: '#52c41a',
  };
  return colors[priority];
};

const getStatusColor = (status: string) => {
  const colors: any = {
    todo: '#2f54eb',
    inprogress: '#faad14',
    done: '#52c41a',
  };
  return colors[status];
};

const getStatusLabel = (status: string) => {
  const labels: any = {
    todo: 'To Do',
    inprogress: 'In Progress',
    done: 'Done',
  };
  return labels[status];
};

const TaskListPage: React.FC = () => {
  const {
    tasks,
    loadTasks,
    deleteTask,
    setEditingTask,
    setIsModalVisible,
    isModalVisible,
    setFilterStatus,
    setSearchText,
    filterStatus,
    searchText,
    getFilteredTasks,
  } = useModel('taskManagement');

  const [sortedTasks, setSortedTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    const filtered = getFilteredTasks();
    setSortedTasks(filtered);
  }, [tasks, filterStatus, searchText]);

  const handleCreateTask = () => {
    setEditingTask(undefined);
    setIsModalVisible(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalVisible(true);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    loadTasks();
  };

  const columns: ColumnsType<Task> = [
    {
      title: 'Task Name',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 250,
      render: (text) => (
        <span style={{ color: '#666' }}>
          {text ? (text.length > 50 ? `${text.substring(0, 50)}...` : text) : '-'}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      filters: [
        { text: 'To Do', value: 'todo' },
        { text: 'In Progress', value: 'inprogress' },
        { text: 'Done', value: 'done' },
      ],
      render: (status) => (
        <Tag color={getStatusColor(status)}>{getStatusLabel(status)}</Tag>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      filters: [
        { text: 'High', value: 'high' },
        { text: 'Medium', value: 'medium' },
        { text: 'Low', value: 'low' },
      ],
      render: (priority) => (
        <Tag color={getPriorityColor(priority)}>{priority.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      width: 130,
      sorter: (a, b) => {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      },
      render: (deadline, record) => {
        if (!deadline) return '-';
        const isOverdue =
          record.status !== 'done' && dayjs(deadline).isBefore(dayjs(), 'day');
        return (
          <span style={{ color: isOverdue ? '#f5222d' : '#666' }}>
            {isOverdue ? '⚠️ ' : ''}
            {dayjs(deadline).format('MMM DD, YYYY')}
          </span>
        );
      },
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      width: 150,
      render: (tags: string[]) =>
        tags && tags.length > 0 ? (
          <Space size={[0, 8]} wrap>
            {tags.map((tag) => (
              <Tag key={tag} style={{ fontSize: '11px' }}>
                {tag}
              </Tag>
            ))}
          </Space>
        ) : (
          '-'
        ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 130,
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (createdAt) => dayjs(createdAt).format('MMM DD, HH:mm'),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditTask(record)}
          />
          <Popconfirm
            title="Delete task"
            description="Are you sure you want to delete this task?"
            onConfirm={() => handleDeleteTask(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Task List</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateTask} size="large">
          New Task
        </Button>
      </div>

      <Card style={{ marginBottom: '16px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Search by task name"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Select
              style={{ width: '100%' }}
              placeholder="Filter by status"
              value={filterStatus}
              onChange={setFilterStatus}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'todo', label: 'To Do' },
                { value: 'inprogress', label: 'In Progress' },
                { value: 'done', label: 'Done' },
              ]}
            />
          </Col>
        </Row>
      </Card>

      <Card>
        <Table
          columns={columns}
          dataSource={sortedTasks}
          rowKey="id"
          scroll={{ x: 1200 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20', '50'],
            showTotal: (total) => `Total: ${total} tasks`,
          }}
        />
      </Card>

      <Modal
        title="Add/Edit Task"
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

export default TaskListPage;
