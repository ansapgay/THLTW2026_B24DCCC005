import { Card, Tag, Space, Button, Popconfirm, Badge, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { Task } from '@/models/taskManagement';

dayjs.extend(relativeTime);

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  isDragging?: boolean;
  draggableProps?: any;
  dragHandleProps?: any;
}

const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
  const colors = {
    high: '#f5222d',
    medium: '#faad14',
    low: '#52c41a',
  };
  return colors[priority];
};

const isOverdue = (deadline?: string, status?: string) => {
  if (!deadline || status === 'done') return false;
  return dayjs(deadline).isBefore(dayjs(), 'day');
};

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  isDragging,
  draggableProps,
  dragHandleProps,
}) => {
  return (
    <div {...draggableProps} {...dragHandleProps} style={{ marginBottom: '12px' }}>
      <Card
        size="small"
        style={{
          cursor: 'grab',
          opacity: isDragging ? 0.5 : 1,
          borderLeft: `4px solid ${getPriorityColor(task.priority)}`,
          backgroundColor: isOverdue(task.deadline, task.status) ? '#fff1f0' : undefined,
        }}
        hoverable
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>{task.title}</div>
              {task.description && (
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                  {task.description.substring(0, 60)}
                  {task.description.length > 60 ? '...' : ''}
                </div>
              )}
            </div>
          </div>

          {task.deadline && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CalendarOutlined style={{ fontSize: '12px' }} />
              <Tooltip title={task.deadline}>
                <span style={{ fontSize: '12px' }}>
                  {isOverdue(task.deadline, task.status) ? (
                    <span style={{ color: '#f5222d', fontWeight: 'bold' }}>
                      Overdue: {dayjs(task.deadline).format('MMM DD')}
                    </span>
                  ) : (
                    dayjs(task.deadline).format('MMM DD')
                  )}
                </span>
              </Tooltip>
            </div>
          )}

          <div>
            <Tag color={getPriorityColor(task.priority)} style={{ marginBottom: '4px' }}>
              {task.priority.toUpperCase()}
            </Tag>
            {task.tags && task.tags.length > 0 && (
              <div>
                {task.tags.map((tag, index) => (
                  <Tag key={index} style={{ fontSize: '11px' }}>
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => onEdit(task)}
            />
            <Popconfirm
              title="Delete task"
              description="Are you sure you want to delete this task?"
              onConfirm={() => onDelete(task.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="text" size="small" icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default TaskCard;
