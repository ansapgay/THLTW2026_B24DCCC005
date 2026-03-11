import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Form,
  Input,
  Modal,
  Table,
  Space,
  Tabs,
  message,
  Tag,
  Select,
  Row,
  Col,
  Statistic,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  BarsOutlined,
} from '@ant-design/icons';
import './index.less';

interface Question {
  id: string;
  category: string;
  level: 'Dễ' | 'Trung bình' | 'Khó';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  createdAt: string;
}

interface Exam {
  id: string;
  title: string;
  category: string;
  questionIds: string[];
  duration: number; // minutes
  createdAt: string;
}

interface ExamResult {
  id: string;
  examId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timestamp: string;
}

const QuestionBank: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [activeTab, setActiveTab] = useState<string>('1');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();

  // Mock categories
  const categories = [
    { label: 'Toán', value: 'math' },
    { label: 'Tiếng Anh', value: 'english' },
    { label: 'Vật Lý', value: 'physics' },
    { label: 'Hóa Học', value: 'chemistry' },
    { label: 'Lịch Sử', value: 'history' },
  ];

  const levels: Array<'Dễ' | 'Trung bình' | 'Khó'> = ['Dễ', 'Trung bình', 'Khó'];

  // Load from localStorage
  useEffect(() => {
    const savedQuestions = localStorage.getItem('questions');
    const savedExams = localStorage.getItem('exams');
    const savedResults = localStorage.getItem('examResults');

    if (savedQuestions) setQuestions(JSON.parse(savedQuestions));
    if (savedExams) setExams(JSON.parse(savedExams));
    if (savedResults) setExamResults(JSON.parse(savedResults));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('exams', JSON.stringify(exams));
  }, [exams]);

  useEffect(() => {
    localStorage.setItem('examResults', JSON.stringify(examResults));
  }, [examResults]);

  // ============= QUESTION MANAGEMENT =============
  const handleAddQuestion = (values: any) => {
    if (editingId) {
      setQuestions(
        questions.map(q =>
          q.id === editingId ? { ...q, ...values } : q
        )
      );
      message.success('Cập nhật câu hỏi thành công!');
      setEditingId(null);
    } else {
      const newQuestion: Question = {
        id: Date.now().toString(),
        ...values,
        createdAt: new Date().toLocaleString('vi-VN'),
      };
      setQuestions([...questions, newQuestion]);
      message.success('Thêm câu hỏi thành công!');
    }
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleDeleteQuestion = (id: string) => {
    Modal.confirm({
      title: 'Xóa câu hỏi',
      content: 'Bạn có chắc muốn xóa câu hỏi này?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      okButtonProps: { danger: true },
      onOk() {
        setQuestions(questions.filter(q => q.id !== id));
        message.success('Xóa câu hỏi thành công!');
      },
    });
  };

  const handleEditQuestion = (question: Question) => {
    setEditingId(question.id);
    form.setFieldsValue(question);
    setIsModalVisible(true);
  };

  const getLevelColor = (level: string) => {
    const colorMap: { [key: string]: string } = {
      'Dễ': 'green',
      'Trung bình': 'orange',
      'Khó': 'red',
    };
    return colorMap[level] || 'blue';
  };

  const questionColumns = [
    {
      title: 'Nội dung',
      dataIndex: 'question',
      key: 'question',
      width: '40%',
      ellipsis: {
        showTitle: false,
      },
      render: (text: string) => <div title={text}>{text}</div>,
    },
    {
      title: 'Chủ đề',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => {
        const cat = categories.find(c => c.value === category);
        return cat?.label || category;
      },
    },
    {
      title: 'Độ khó',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => (
        <Tag color={getLevelColor(level)}>{level}</Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Question) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditQuestion(record)}
          >
            Sửa
          </Button>
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteQuestion(record.id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  // ============= EXAM MANAGEMENT =============
  const handleAddExam = (values: any) => {
    if (editingId) {
      setExams(
        exams.map(e =>
          e.id === editingId ? { ...e, ...values } : e
        )
      );
      message.success('Cập nhật đề thi thành công!');
      setEditingId(null);
    } else {
      const newExam: Exam = {
        id: Date.now().toString(),
        ...values,
        questionIds: values.questionIds || [],
        createdAt: new Date().toLocaleString('vi-VN'),
      };
      setExams([...exams, newExam]);
      message.success('Tạo đề thi thành công!');
    }
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleDeleteExam = (id: string) => {
    setExams(exams.filter(e => e.id !== id));
    message.success('Xóa đề thi thành công!');
  };

  const examColumns = [
    {
      title: 'Tên đề thi',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Chủ đề',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => {
        const cat = categories.find(c => c.value === category);
        return cat?.label || category;
      },
    },
    {
      title: 'Số câu hỏi',
      dataIndex: 'questionIds',
      key: 'count',
      render: (ids: string[]) => ids?.length || 0,
    },
    {
      title: 'Thời gian (phút)',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Exam) => (
        <Space size="small">
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteExam(record.id)}
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
    if (activeTab === '1') return editingId ? 'Sửa câu hỏi' : 'Thêm câu hỏi';
    return editingId ? 'Sửa đề thi' : 'Tạo đề thi';
  };

  const renderModalContent = () => {
    const onFormFinish = (values: any) => {
      if (activeTab === '1') {
        handleAddQuestion(values);
      } else {
        handleAddExam(values);
      }
    };

    return (
      <Form form={form} layout="vertical" onFinish={onFormFinish}>
        {activeTab === '1' && (
          <>
            <Form.Item
              label="Chủ đề"
              name="category"
              rules={[{ required: true, message: 'Chọn chủ đề!' }]}
            >
              <Select placeholder="Chọn chủ đề">
                {categories.map(cat => (
                  <Select.Option key={cat.value} value={cat.value}>
                    {cat.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Độ khó"
              name="level"
              rules={[{ required: true, message: 'Chọn độ khó!' }]}
            >
              <Select placeholder="Chọn độ khó">
                {levels.map(level => (
                  <Select.Option key={level} value={level}>
                    {level}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Câu hỏi"
              name="question"
              rules={[{ required: true, message: 'Nhập câu hỏi!' }]}
            >
              <Input.TextArea rows={3} placeholder="Nhập nội dung câu hỏi..." />
            </Form.Item>

            <Form.Item
              label="Đáp án A"
              name={['options', 0]}
              rules={[{ required: true, message: 'Nhập đáp án A!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Đáp án B"
              name={['options', 1]}
              rules={[{ required: true, message: 'Nhập đáp án B!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Đáp án C"
              name={['options', 2]}
              rules={[{ required: true, message: 'Nhập đáp án C!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Đáp án D"
              name={['options', 3]}
              rules={[{ required: true, message: 'Nhập đáp án D!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Đáp án đúng (0=A, 1=B, 2=C, 3=D)"
              name="correctAnswer"
              rules={[{ required: true, message: 'Chọn đáp án đúng!' }]}
            >
              <Select placeholder="Chọn đáp án đúng">
                <Select.Option value={0}>A</Select.Option>
                <Select.Option value={1}>B</Select.Option>
                <Select.Option value={2}>C</Select.Option>
                <Select.Option value={3}>D</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Giải thích"
              name="explanation"
            >
              <Input.TextArea rows={2} placeholder="Giải thích (tùy chọn)" />
            </Form.Item>
          </>
        )}

        {activeTab === '2' && (
          <>
            <Form.Item
              label="Tên đề thi"
              name="title"
              rules={[{ required: true, message: 'Nhập tên đề thi!' }]}
            >
              <Input placeholder="vd: Đề Toán nâng cao" />
            </Form.Item>

            <Form.Item
              label="Chủ đề"
              name="category"
              rules={[{ required: true, message: 'Chọn chủ đề!' }]}
            >
              <Select placeholder="Chọn chủ đề">
                {categories.map(cat => (
                  <Select.Option key={cat.value} value={cat.value}>
                    {cat.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Thời gian (phút)"
              name="duration"
              rules={[{ required: true, message: 'Nhập thời gian!' }]}
            >
              <Input type="number" placeholder="vd: 60" />
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
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <Tabs.TabPane tab="❓ Ngân hàng câu hỏi" key="1">
          <Card>
            <Space style={{ marginBottom: '16px' }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleShowModal}
              >
                Thêm câu hỏi
              </Button>
            </Space>

            {questions.length > 0 && (
              <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col xs={24} sm={8}>
                  <Statistic
                    title="Tổng câu hỏi"
                    value={questions.length}
                  />
                </Col>
                <Col xs={24} sm={8}>
                  <Statistic
                    title="Dễ"
                    value={questions.filter(q => q.level === 'Dễ').length}
                    valueStyle={{ color: 'green' }}
                  />
                </Col>
                <Col xs={24} sm={8}>
                  <Statistic
                    title="Khó"
                    value={questions.filter(q => q.level === 'Khó').length}
                    valueStyle={{ color: 'red' }}
                  />
                </Col>
              </Row>
            )}

            <Table
              columns={questionColumns}
              dataSource={questions}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane tab="📝 Quản lý đề thi" key="2">
          <Card>
            <Space style={{ marginBottom: '16px' }}>
              <Button
                type="primary"
                icon={<BarsOutlined />}
                onClick={handleShowModal}
              >
                Tạo đề thi
              </Button>
            </Space>

            <Table
              columns={examColumns}
              dataSource={exams}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </Tabs.TabPane>
      </Tabs>

      <Modal
        title={getModalTitle()}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={600}
        footer={null}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default QuestionBank;
