import React from 'react';
import { Form, Input, Select, Button, Divider, Space } from 'antd';
import styles from './admin.less';

interface PostFormProps {
  form: any;
  loading: boolean;
  tags: Blog.Tag[];
  onSubmit: (values: Blog.PostFormData) => Promise<void>;
}

const PostForm: React.FC<PostFormProps> = ({ form, loading, tags, onSubmit }) => {
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      className={styles.postForm}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: 'Please enter post title' }]}
      >
        <Input placeholder="Enter post title" />
      </Form.Item>

      <Form.Item
        name="slug"
        label="Slug"
        rules={[{ required: true, message: 'Please enter post slug' }]}
      >
        <Input placeholder="Enter post slug (URL-friendly)" />
      </Form.Item>

      <Form.Item
        name="excerpt"
        label="Excerpt/Summary"
        rules={[{ required: true, message: 'Please enter post excerpt' }]}
      >
        <Input.TextArea
          rows={2}
          placeholder="Enter post excerpt (short summary)"
        />
      </Form.Item>

      <Form.Item
        name="thumbnail"
        label="Thumbnail URL"
        rules={[{ required: true, message: 'Please enter thumbnail URL' }]}
      >
        <Input placeholder="Enter image URL" />
      </Form.Item>

      <Form.Item
        name="content"
        label="Content (Markdown)"
        rules={[{ required: true, message: 'Please enter post content' }]}
      >
        <Input.TextArea
          rows={12}
          placeholder="Enter post content in Markdown format"
          style={{ fontFamily: 'monospace' }}
        />
      </Form.Item>

      <Form.Item
        name="tags"
        label="Tags"
        rules={[{ required: true, message: 'Please select at least one tag' }]}
      >
        <Select
          mode="multiple"
          placeholder="Select tags"
          optionLabelProp="label"
          options={tags.map((tag) => ({
            value: tag.id,
            label: tag.name,
          }))}
        />
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: 'Please select post status' }]}
      >
        <Select
          placeholder="Select post status"
          options={[
            { value: 'draft', label: 'Draft' },
            { value: 'published', label: 'Published' },
          ]}
        />
      </Form.Item>

      <Divider />

      <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
        <Button onClick={() => form.resetFields()}>
          Reset
        </Button>
        <Button type="primary" loading={loading} onClick={handleSubmit}>
          Save
        </Button>
      </Space>
    </Form>
  );
};

export default PostForm;
