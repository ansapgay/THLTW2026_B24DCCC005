import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Tag, Button, Spin, Empty, Divider, Avatar, Space } from 'antd';
import { ArrowLeftOutlined, EyeOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'umi';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { getPostBySlug, getRelatedPosts, increaseViewCount } from '@/services/Blog/blog';
import styles from './index.less';

interface DetailParams {
  slug: string;
}

const BlogDetailPage: React.FC = () => {
  const history = useHistory();
  const { slug } = useParams<DetailParams>();
  const [post, setPost] = useState<Blog.Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Blog.Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await getPostBySlug(slug);
        setPost(res);

        // Increase view count
        if (res.id) {
          await increaseViewCount(res.id);
          // Update local view count
          setPost((prev) => {
            if (prev) {
              return { ...prev, viewCount: prev.viewCount + 1 };
            }
            return null;
          });
        }

        // Fetch related posts
        const related = await getRelatedPosts(slug, res.id);
        setRelatedPosts(related || []);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spin tip="Loading..." />
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.container}>
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={() => history.push('/blog')}
        >
          Back to blog
        </Button>
        <Empty description="Post not found" style={{ marginTop: '50px' }} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => history.push('/blog')}
        >
          Back to blog
        </Button>
      </div>

      <Row gutter={[32, 32]}>
        {/* Main content */}
        <Col xs={24} lg={16}>
          <Card className={styles.mainCard}>
            {/* Title */}
            <h1 className={styles.title}>{post.title}</h1>

            {/* Meta information */}
            <div className={styles.meta}>
              <Space split={<Divider type="vertical" />}>
                <span className={styles.author}>
                  {post.authorAvatar && (
                    <Avatar src={post.authorAvatar} size="small" />
                  )}
                  {post.author}
                </span>
                <span className={styles.date}>{post.createdAt}</span>
                <span className={styles.views}>
                  <EyeOutlined /> {post.viewCount} views
                </span>
              </Space>
            </div>

            {/* Thumbnail */}
            {post.thumbnail && (
              <div className={styles.thumbnail}>
                <img
                  alt={post.title}
                  src={post.thumbnail}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className={styles.tags}>
                {post.tags.map((tag) => (
                  <Tag key={tag.id} color="blue">
                    {tag.name}
                  </Tag>
                ))}
              </div>
            )}

            <Divider />

            {/* Content */}
            <div className={styles.content}>
              <MarkdownRenderer content={post.content} />
            </div>
          </Card>
        </Col>

        {/* Sidebar */}
        <Col xs={24} lg={8}>
          {/* Author card */}
          <Card className={styles.sidebarCard} title="About Author">
            <div className={styles.authorCard}>
              {post.authorAvatar && (
                <Avatar src={post.authorAvatar} size={80} className={styles.authorAvatar} />
              )}
              <h4>{post.author}</h4>
              <p className={styles.authorBio}>
                A passionate developer sharing knowledge about web development.
              </p>
            </div>
          </Card>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <Card className={styles.sidebarCard} title="Related Articles" style={{ marginTop: '20px' }}>
              <div className={styles.relatedPosts}>
                {relatedPosts.map((relatedPost) => (
                  <div key={relatedPost.id} className={styles.relatedPostItem}>
                    <a href={`/blog/${relatedPost.slug}`} className={styles.relatedPostTitle}>
                      {relatedPost.title}
                    </a>
                    <div className={styles.relatedPostMeta}>
                      <span>{relatedPost.createdAt}</span>
                      <span>{relatedPost.viewCount} views</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default BlogDetailPage;
