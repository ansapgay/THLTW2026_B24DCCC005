import { Card, Row, Col, Statistic, Spin } from 'antd';
import { SearchOutlined, FileTextOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

interface ISearchStats {
  totalSearches: number;
  totalCertificates: number;
  totalDecisions: number;
  lastUpdated?: string;
}

/**
 * Hiển thị thống kê tra cứu
 */
const SearchStatistics = () => {
  const [stats, setStats] = useState<ISearchStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        // API call would go here
        // const response = await fetch('/api/van-bang/statistics');
        // const data = await response.json();
        // setStats(data);

        // Mock data
        setStats({
          totalSearches: 156,
          totalCertificates: 432,
          totalDecisions: 12,
          lastUpdated: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Failed to load statistics', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <Spin />;
  }

  if (!stats) {
    return null;
  }

  return (
    <Card style={{ marginBottom: '24px' }} bordered={false}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Statistic
            title="Tổng lượt tra cứu"
            value={stats.totalSearches}
            prefix={<SearchOutlined />}
            valueStyle={{ color: '#1890ff' }}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Statistic
            title="Tổng số văn bằng"
            value={stats.totalCertificates}
            prefix={<FileTextOutlined />}
            valueStyle={{ color: '#52c41a' }}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Statistic
            title="Số quyết định"
            value={stats.totalDecisions}
            prefix={<CheckCircleOutlined />}
            valueStyle={{ color: '#faad14' }}
          />
        </Col>
      </Row>
      {stats.lastUpdated && (
        <div style={{ textAlign: 'right', marginTop: '12px', fontSize: '12px', color: '#999' }}>
          Cập nhật lúc: {new Date(stats.lastUpdated).toLocaleString('vi-VN')}
        </div>
      )}
    </Card>
  );
};

export default SearchStatistics;
