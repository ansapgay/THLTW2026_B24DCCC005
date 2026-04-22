import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Modal,
  Form,
  Input,
  Table,
  message,
  Space,
  Tooltip,
  Popconfirm,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  getTags,
  createTag,
  updateTag,
  deleteTag,
} from '@/services/Blog/blog';
import styles from './admin.less';

interface TagManagementProps {
  onTagsChange?: () => void;
}

const TagManagement: React.FC<TagManagementProps> = ({ onTagsChange }) => {
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editingTag, setEditingTag] = useState<any>(null);
  const [form] = Form.useForm();

  // Fetch tags
  const fetchTags = async () => {
    setLoading(true);
    try {
      const res = await getTags();
      setTags(res || []);
    } catch (error) {
      message.error('Failed to fetch tags');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleAddTag = () => {
    setEditingTag(null);
    form.resetFields();
    setVisible(true);
  };

  const handleEditTag = (tag: any) => {
    setEditingTag(tag);
    form.setFieldsValue({
      name: tag.name,
      slug: tag.slug,
      description: tag.description,
    });
    setVisible(true);
  };

  const handleDeleteTag = async (id: string) => {
    try {
      await deleteTag(id);
      message.success('Tag deleted successfully');
      fetchTags();
      onTagsChange?.();
    } catch (error) {
      message.error('Failed to delete tag');
    }
  };

  const handleSaveTag = async () => {
    try {
      const values = await form.validateFields();

      if (editingTag) {
        await updateTag(editingTag.id, values);
        message.success('Tag updated successfully');
      } else {
        await createTag(values);
        message.success('Tag created successfully');
      }

      setVisible(false);
      form.resetFields();
      setEditingTag(null);
      fetchTags();
      onTagsChange?.();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      width: '25%',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '25%',
      render: (text: string) => text || '-',
    },
    {
      title: 'Used In',
      dataIndex: 'count',
      key: 'count',
      width: '15%',
      render: (count: number) => `${count || 0} posts`,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '10%',
      render: (_: any, record: any) => (
        <Space size="small">
          <Tooltip title="Edit">
            <Button
              type="primary"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEditTag(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Delete Tag"
              description="Are you sure you want to delete this tag?"
              onConfirm={() => handleDeleteTag(record.id)}
              okText="Delete"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
            >
              <Button type="primary" danger size="small" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card className={styles.card}>
        <div className={styles.toolbar} style={{ marginBottom: '20px' }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTag}>
            New Tag
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={tags}
          loading={loading}
          rowKey="id"
          pagination={false}
        />
      </Card>

      {/* Modal */}
      <Modal
        title={editingTag ? 'Edit Tag' : 'Create New Tag'}
        open={visible}
        onOk={handleSaveTag}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
          setEditingTag(null);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tag Name"
            rules={[{ required: true, message: 'Please enter tag name' }]}
          >
            <Input placeholder="Enter tag name" />
          </Form.Item>

          <Form.Item
            name="slug"
            label="Slug"
            rules={[{ required: true, message: 'Please enter tag slug' }]}
          >
            <Input placeholder="Enter tag slug" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea placeholder="Enter tag description" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TagManagement;
