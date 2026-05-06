import { Card, Row, Col, Statistic } from 'antd';
import { CheckCircleOutlined, FileTextOutlined, ClockCircleOutlined, RiseOutlined } from '@ant-design/icons';
import type { DashboardStats } from '@/models/taskManagement';

interface StatCardProps {
  stats: DashboardStats;
}

const StatCards: React.FC<StatCardProps> = ({ stats }) => {
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
      <Col xs={24} sm={12} lg={6}>
        <Card style={{ textAlign: 'center' }}>
          <Statistic
            title="Total Tasks"
            value={stats.totalTasks}
            prefix={<FileTextOutlined />}
            valueStyle={{ color: '#1890ff' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card style={{ textAlign: 'center' }}>
          <Statistic
            title="Completed"
            value={stats.completedTasks}
            prefix={<CheckCircleOutlined />}
            valueStyle={{ color: '#52c41a' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card style={{ textAlign: 'center' }}>
          <Statistic
            title="In Progress"
            value={stats.inProgressTasks}
            prefix={<RiseOutlined />}
            valueStyle={{ color: '#faad14' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card style={{ textAlign: 'center' }}>
          <Statistic
            title="Overdue Tasks"
            value={stats.overdueTasks}
            prefix={<ClockCircleOutlined />}
            valueStyle={{ color: '#f5222d' }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default StatCards;
