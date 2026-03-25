import { Card, Form, Input, Button, Table, message, Spin, Empty, Row, Col, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import moment from 'moment';
import type { IColumn } from '@/components/Table/typing';

/**
 * Trang tra cứu công khai - Người dùng có thể tìm kiếm thông tin văn bằng
 * Yêu cầu: Nhập ít nhất 2 parameter tìm kiếm
 */
const TraCuuVanBangPage = () => {
  const [form] = Form.useForm();
  const [results, setResults] = useState<ThongTinVanBang.IRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (values: any) => {
    // Count non-empty fields
    const filledFields = Object.values(values).filter((v) => v && v.toString().trim()).length;

    if (filledFields < 2) {
      message.warning('Vui lòng nhập ít nhất 2 thông tin tìm kiếm');
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      // Call API search
      // const response = await searchVanBang(values);
      // setResults(response.data || []);
      // Update view count for matching records

      // Mock data
      setResults([]);
      message.info('Tìm kiếm hoàn thành');
    } catch (error) {
      message.error('Lỗi khi tìm kiếm');
    } finally {
      setLoading(false);
    }
  };

  const columns: IColumn<ThongTinVanBang.IRecord>[] = [
    {
      title: 'Mã sinh viên',
      dataIndex: 'maSinhVien',
      width: 120,
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      width: 200,
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'ngaySinh',
      width: 130,
      render: (val) => (val ? moment(val).format('DD/MM/YYYY') : ''),
    },
    {
      title: 'Số vào sổ',
      dataIndex: 'soVaoSo',
      width: 100,
    },
    {
      title: 'Số hiệu VB',
      dataIndex: 'soHieuVanBang',
      width: 150,
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card title="Tra cứu Văn bằng tốt nghiệp" bordered={false}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSearch}
          style={{ marginBottom: '24px' }}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12} md={6}>
              <Form.Item label="Số hiệu văn bằng" name="soHieuVanBang">
                <Input placeholder="VD: 2024-001" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item label="Số vào sổ" name="soVaoSo">
                <Input type="number" placeholder="VD: 1" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item label="Mã sinh viên" name="maSinhVien">
                <Input placeholder="VD: 24DCCC005" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item label="Họ tên" name="hoTen">
                <Input placeholder="Nhập họ tên" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item label="Ngày sinh" name="ngaySinh">
                <Input type="date" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />} loading={loading}>
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>

        <Spin spinning={loading}>
          {searched ? (
            results.length > 0 ? (
              <Table
                columns={columns}
                dataSource={results}
                rowKey="_id"
                pagination={{ pageSize: 10 }}
              />
            ) : (
              <Empty description="Không tìm thấy kết quả" />
            )
          ) : null}
        </Spin>

        <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#f0f2f5', borderRadius: '4px' }}>
          <strong>Lưu ý:</strong> Vui lòng nhập ít nhất 2 thông tin tìm kiếm để có kết quả chính xác
        </div>
      </Card>
    </div>
  );
};

export default TraCuuVanBangPage;
