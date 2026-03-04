import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Table,
  Space,
  Tabs,
  message,
  Progress,
  Statistic,
  Row,
  Col,
  Select,
  DatePicker,
  TimePicker,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import styles from './index.less';

interface Subject {
  id: string;
  name: string;
  description?: string;
}

interface StudyLog {
  id: string;
  subjectId: string;
  date: string;
  duration: number; // in minutes
  content: string;
  notes?: string;
}

interface MonthlyGoal {
  id: string;
  subjectId: string;
  targetHours: number;
  month: string; // YYYY-MM
}

const StudyProgress: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [studyLogs, setStudyLogs] = useState<StudyLog[]>([]);
  const [monthlyGoals, setMonthlyGoals] = useState<MonthlyGoal[]>([]);
  const [activeTab, setActiveTab] = useState<string>('1');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();

  const defaultSubjects = [
    { id: '1', name: 'Toán' },
    { id: '2', name: 'Văn' },
    { id: '3', name: 'Anh' },
    { id: '4', name: 'Khoa học' },
    { id: '5', name: 'Công nghệ' },
  ];

  // Load data from localStorage on mount
  useEffect(() => {
    const savedSubjects = localStorage.getItem('subjects');
    const savedLogs = localStorage.getItem('studyLogs');
    const savedGoals = localStorage.getItem('monthlyGoals');

    if (savedSubjects) setSubjects(JSON.parse(savedSubjects));
    else {
      setSubjects(defaultSubjects);
      localStorage.setItem('subjects', JSON.stringify(defaultSubjects));
    }

    if (savedLogs) setStudyLogs(JSON.parse(savedLogs));
    if (savedGoals) setMonthlyGoals(JSON.parse(savedGoals));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('studyLogs', JSON.stringify(studyLogs));
  }, [studyLogs]);

  useEffect(() => {
    localStorage.setItem('monthlyGoals', JSON.stringify(monthlyGoals));
  }, [monthlyGoals]);

  // ============= SUBJECTS MANAGEMENT =============
  const handleAddSubject = (values: any) => {
    if (editingId) {
      setSubjects(
        subjects.map((s) => (s.id === editingId ? { ...s, ...values } : s))
      );
      message.success('Cập nhật môn học thành công!');
      setEditingId(null);
    } else {
      const newSubject: Subject = {
        id: Date.now().toString(),
        ...values,
      };
      setSubjects([...subjects, newSubject]);
      message.success('Thêm môn học thành công!');
    }
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleDeleteSubject = (id: string) => {
    Modal.confirm({
      title: 'Xóa môn học',
      content: 'Bạn có chắc chắn muốn xóa môn học này? Dữ liệu liên quan sẽ bị xóa.',
      okText: 'Xóa',
      cancelText: 'Hủy',
      okButtonProps: { danger: true },
      onOk() {
        setSubjects(subjects.filter((s) => s.id !== id));
        setStudyLogs(studyLogs.filter((log) => log.subjectId !== id));
        setMonthlyGoals(monthlyGoals.filter((goal) => goal.subjectId !== id));
        message.success('Xóa môn học thành công!');
      },
    });
  };

  const handleEditSubject = (subject: Subject) => {
    setEditingId(subject.id);
    form.setFieldsValue(subject);
    setIsModalVisible(true);
  };

  const subjectColumns = [
    {
      title: 'Tên môn học',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Subject) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditSubject(record)}
          >
            Sửa
          </Button>
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteSubject(record.id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  // ============= STUDY LOGS MANAGEMENT =============
  const handleAddStudyLog = (values: any) => {
    if (editingId) {
      setStudyLogs(
        studyLogs.map((log) =>
          log.id === editingId ? { ...log, ...values } : log
        )
      );
      message.success('Cập nhật lịch học thành công!');
      setEditingId(null);
    } else {
      const newLog: StudyLog = {
        id: Date.now().toString(),
        ...values,
        date: values.date.format('YYYY-MM-DD'),
      };
      setStudyLogs([...studyLogs, newLog]);
      message.success('Thêm lịch học thành công!');
    }
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleDeleteLog = (id: string) => {
    setStudyLogs(studyLogs.filter((log) => log.id !== id));
    message.success('Xóa lịch học thành công!');
  };

  const handleEditLog = (log: StudyLog) => {
    setEditingId(log.id);
    form.setFieldsValue({
      ...log,
      date: dayjs(log.date),
    });
    setIsModalVisible(true);
  };

  const logColumns = [
    {
      title: 'Môn học',
      dataIndex: 'subjectId',
      key: 'subjectId',
      render: (id: string) => subjects.find((s) => s.id === id)?.name,
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Thời lượng (phút)',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
    },
    {
      title: 'Ghi chú',
      dataIndex: 'notes',
      key: 'notes',
      ellipsis: true,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: StudyLog) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditLog(record)}
          >
            Sửa
          </Button>
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteLog(record.id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  // ============= MONTHLY GOALS MANAGEMENT =============
  const handleAddGoal = (values: any) => {
    if (editingId) {
      setMonthlyGoals(
        monthlyGoals.map((goal) =>
          goal.id === editingId ? { ...goal, ...values } : goal
        )
      );
      message.success('Cập nhật mục tiêu thành công!');
      setEditingId(null);
    } else {
      const newGoal: MonthlyGoal = {
        id: Date.now().toString(),
        ...values,
        month: dayjs().format('YYYY-MM'),
      };
      setMonthlyGoals([...monthlyGoals, newGoal]);
      message.success('Thêm mục tiêu thành công!');
    }
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleDeleteGoal = (id: string) => {
    setMonthlyGoals(monthlyGoals.filter((goal) => goal.id !== id));
    message.success('Xóa mục tiêu thành công!');
  };

  const calculateProgress = (subjectId: string): number => {
    const currentMonth = dayjs().format('YYYY-MM');
    const goal = monthlyGoals.find(
      (g) => g.subjectId === subjectId && g.month === currentMonth
    );

    if (!goal) return 0;

    const logs = studyLogs.filter(
      (log) => log.subjectId === subjectId && log.date.startsWith(currentMonth)
    );

    const totalHours = logs.reduce((sum, log) => sum + log.duration, 0) / 60;
    const percentage = Math.min((totalHours / goal.targetHours) * 100, 100);

    return Math.round(percentage);
  };

  const goalColumns = [
    {
      title: 'Môn học',
      dataIndex: 'subjectId',
      key: 'subjectId',
      render: (id: string) => subjects.find((s) => s.id === id)?.name,
    },
    {
      title: 'Mục tiêu (giờ)',
      dataIndex: 'targetHours',
      key: 'targetHours',
    },
    {
      title: 'Tiến độ',
      key: 'progress',
      render: (_: any, record: MonthlyGoal) => {
        const progress = calculateProgress(record.subjectId);
        return (
          <Progress
            percent={progress}
            status={progress >= 100 ? 'success' : 'active'}
            format={(percent) => `${percent}%`}
          />
        );
      },
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_: any, record: MonthlyGoal) => {
        const progress = calculateProgress(record.subjectId);
        return progress >= 100 ? (
          <span style={{ color: 'green', fontWeight: 'bold' }}>✓ Đạt</span>
        ) : (
          <span style={{ color: 'orange' }}>Chưa đạt</span>
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: MonthlyGoal) => (
        <Space size="small">
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteGoal(record.id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const handleShowModal = () => {
    form.resetFields();
    setEditingId(null);
    setIsModalVisible(true);
  };

  const getModalTitle = () => {
    if (activeTab === '1') return editingId ? 'Sửa môn học' : 'Thêm môn học';
    if (activeTab === '2') return editingId ? 'Sửa lịch học' : 'Thêm lịch học';
    return editingId ? 'Sửa mục tiêu' : 'Thêm mục tiêu';
  };

  const renderModalContent = () => {
    const onFormFinish = (values: any) => {
      if (activeTab === '1') {
        handleAddSubject(values);
      } else if (activeTab === '2') {
        handleAddStudyLog(values);
      } else {
        handleAddGoal(values);
      }
    };

    return (
      <Form form={form} layout="vertical" onFinish={onFormFinish}>
        {activeTab === '1' && (
          <>
            <Form.Item
              label="Tên môn học"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên môn học!' }]}
            >
              <Input placeholder="vd: Toán, Văn, Anh..." />
            </Form.Item>
            <Form.Item label="Mô tả" name="description">
              <Input.TextArea placeholder="Mô tả môn học (tùy chọn)" />
            </Form.Item>
          </>
        )}

        {activeTab === '2' && (
          <>
            <Form.Item
              label="Môn học"
              name="subjectId"
              rules={[{ required: true, message: 'Chọn môn học!' }]}
            >
              <Select placeholder="Chọn môn học">
                {subjects.map((s) => (
                  <Select.Option key={s.id} value={s.id}>
                    {s.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Ngày"
              name="date"
              rules={[{ required: true, message: 'Chọn ngày!' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label="Thời lượng (phút)"
              name="duration"
              rules={[{ required: true, message: 'Nhập thời lượng!' }]}
            >
              <InputNumber min={1} placeholder="vd: 60" />
            </Form.Item>
            <Form.Item
              label="Nội dung học"
              name="content"
              rules={[{ required: true, message: 'Nhập nội dung học!' }]}
            >
              <Input.TextArea placeholder="Nội dung bạn đã học..." />
            </Form.Item>
            <Form.Item label="Ghi chú" name="notes">
              <Input.TextArea placeholder="Ghi chú (tùy chọn)" />
            </Form.Item>
          </>
        )}

        {activeTab === '3' && (
          <>
            <Form.Item
              label="Môn học"
              name="subjectId"
              rules={[{ required: true, message: 'Chọn môn học!' }]}
            >
              <Select placeholder="Chọn môn học">
                {subjects.map((s) => (
                  <Select.Option key={s.id} value={s.id}>
                    {s.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Mục tiêu (giờ/tháng)"
              name="targetHours"
              rules={[{ required: true, message: 'Nhập mục tiêu giờ học!' }]}
            >
              <InputNumber min={1} placeholder="vd: 20" />
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />} block>
            {editingId ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <div className={styles.container}>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: '1',
            label: '📚 Quản lý môn học',
            children: (
              <Card>
                <Space style={{ marginBottom: '16px' }}>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleShowModal}
                  >
                    Thêm môn học
                  </Button>
                </Space>
                <Table
                  columns={subjectColumns}
                  dataSource={subjects}
                  rowKey="id"
                  pagination={false}
                />
              </Card>
            ),
          },
          {
            key: '2',
            label: '✏️ Quản lý lịch học',
            children: (
              <Card>
                <Space style={{ marginBottom: '16px' }}>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleShowModal}
                  >
                    Thêm lịch học
                  </Button>
                </Space>
                <Table
                  columns={logColumns}
                  dataSource={studyLogs}
                  rowKey="id"
                  pagination={{ pageSize: 10 }}
                />
              </Card>
            ),
          },
          {
            key: '3',
            label: '🎯 Mục tiêu hàng tháng',
            children: (
              <Card>
                <Row gutter={16} style={{ marginBottom: '24px' }}>
                  {subjects.map((subject) => {
                    const goal = monthlyGoals.find(
                      (g) =>
                        g.subjectId === subject.id &&
                        g.month === dayjs().format('YYYY-MM')
                    );
                    const progress = calculateProgress(subject.id);

                    return (
                      <Col xs={24} sm={12} md={8} key={subject.id}>
                        <Card size="small">
                          <Statistic
                            title={subject.name}
                            value={progress}
                            suffix="%"
                            prefix={progress >= 100 ? '✓ ' : ''}
                          />
                          {goal && (
                            <Progress percent={progress} status="active" />
                          )}
                        </Card>
                      </Col>
                    );
                  })}
                </Row>

                <Space style={{ marginBottom: '16px' }}>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleShowModal}
                  >
                    Thêm mục tiêu
                  </Button>
                </Space>
                <Table
                  columns={goalColumns}
                  dataSource={monthlyGoals}
                  rowKey="id"
                  pagination={false}
                />
              </Card>
            ),
          },
        ]}
      />

      <Modal
        title={getModalTitle()}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={600}
        footer={null}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default StudyProgress;
