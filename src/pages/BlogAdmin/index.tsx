import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  Space,
  Tag,
  message,
  Tooltip,
  Card,
  Tabs,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { getPosts, createPost, updatePost, deletePost, getTags } from '@/services/Blog/blog';
import PostForm from './PostForm';
import TagManagement from './TagManagement';
import styles from './admin.less';

const BlogAdminPage: React.FC = () => {
  const [posts, setPosts] = useState<Blog.Post[]>([]);
  const [tags, setTags] = useState<Blog.Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editingPost, setEditingPost] = useState<Blog.Post | null>(null);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [form] = Form.useForm();

  // Fetch posts
  const fetchPosts = async (keyword?: string, status?: string) => {
    setTableLoading(true);
    try {
      const res = await getPosts({
        current: 1,
        pageSize: 100,
        keyword: keyword || searchText,
        status: status || statusFilter || 'all',
      });
      setPosts(res.data || []);
    } catch (error) {
      message.error('Failed to fetch posts');
    } finally {
      setTableLoading(false);
    }
  };

  // Fetch tags
  const fetchTags = async () => {
    try {
      const res = await getTags();
      setTags(res || []);
    } catch (error) {
      message.error('Failed to fetch tags');
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchTags();
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value);
    fetchPosts(value, statusFilter);
  };

  const handleStatusChange = (value: string | undefined) => {
    setStatusFilter(value);
    fetchPosts(searchText, value);
  };

  const handleAddPost = () => {
    setEditingPost(null);
    form.resetFields();
    setVisible(true);
  };

  const handleEditPost = (post: Blog.Post) => {
    setEditingPost(post);
    form.setFieldsValue({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      thumbnail: post.thumbnail,
      tags: post.tags.map((t) => t.id),
      status: post.status,
    });
    setVisible(true);
  };

  const handleDeletePost = async (id: string) => {
    try {
      await deletePost(id);
      message.success('Post deleted successfully');
      fetchPosts();
    } catch (error) {
      message.error('Failed to delete post');
    }
  };

  const handleSavePost = async (values: Blog.PostFormData) => {
    setLoading(true);
    try {
      if (editingPost) {
        await updatePost(editingPost.id, values);
        message.success('Post updated successfully');
      } else {
        await createPost(values);
        message.success('Post created successfully');
      }
      setVisible(false);
      form.resetFields();
      setEditingPost(null);
      fetchPosts();
    } catch (error) {
      message.error(editingPost ? 'Failed to update post' : 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '30%',
      render: (text: string) => <span className={styles.titleCell}>{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (status: string) => (
        <Tag color={status === 'published' ? 'green' : 'orange'}>
          {status === 'published' ? 'Published' : 'Draft'}
        </Tag>
      ),
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      width: '25%',
      render: (tags: Blog.Tag[]) => (
        <span>
          {tags.map((tag) => (
            <Tag key={tag.id} color="blue">
              {tag.name}
            </Tag>
          ))}
        </span>
      ),
    },
    {
      title: 'Views',
      dataIndex: 'viewCount',
      key: 'viewCount',
      width: '10%',
      render: (count: number) => <span>{count}</span>,
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '15%',
      render: (date: string) => <span>{date}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '10%',
      render: (_: any, record: Blog.Post) => (
        <Space size="small">
          <Tooltip title="Edit">
            <Button
              type="primary"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEditPost(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Delete Post"
              description="Are you sure you want to delete this post?"
              onConfirm={() => handleDeletePost(record.id)}
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
    <div className={styles.adminPage}>
      <Tabs
        items={[
          {
            key: 'posts',
            label: (
              <span>
                <FileTextOutlined />
                Post Management
              </span>
            ),
            children: (
              <>
                <Card className={styles.card}>
                  {/* Toolbar */}
                  <div className={styles.toolbar}>
                    <Space>
                      <Input.Search
                        placeholder="Search by title..."
                        allowClear
                        onSearch={handleSearch}
                        style={{ width: 250 }}
                      />
                      <Select
                        placeholder="Filter by status"
                        allowClear
                        style={{ width: 150 }}
                        options={[
                          { label: 'Draft', value: 'draft' },
                          { label: 'Published', value: 'published' },
                          { label: 'All', value: 'all' },
                        ]}
                        onChange={handleStatusChange}
                      />
                    </Space>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={handleAddPost}
                    >
                      New Post
                    </Button>
                  </div>

                  {/* Table */}
                  <Table
                    columns={columns}
                    dataSource={posts}
                    loading={tableLoading}
                    rowKey="id"
                    pagination={false}
                    scroll={{ x: 1200 }}
                  />
                </Card>

                {/* Modal */}
                <Modal
                  title={editingPost ? 'Edit Post' : 'Create New Post'}
                  open={visible}
                  onCancel={() => {
                    setVisible(false);
                    form.resetFields();
                    setEditingPost(null);
                  }}
                  footer={null}
                  width={1000}
                >
                  <PostForm
                    form={form}
                    loading={loading}
                    tags={tags}
                    onSubmit={handleSavePost}
                  />
                </Modal>
              </>
            ),
          },
          {
            key: 'tags',
            label: (
              <span>
                <EyeOutlined />
                Tag Management
              </span>
            ),
            children: <TagManagement onTagsChange={fetchTags} />,
          },
        ]}
      />
    </div>
  );
};

export default BlogAdminPage;
