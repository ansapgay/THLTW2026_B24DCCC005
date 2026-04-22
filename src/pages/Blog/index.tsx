import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Card, Tag, Input, Pagination, Spin, Empty, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import { getPosts, getTags } from '@/services/Blog/blog';
import styles from './index.less';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<Blog.Post[]>([]);
  const [tags, setTags] = useState<Blog.Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize] = useState(9);
  const [total, setTotal] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  // Fetch posts
  const fetchPosts = useCallback(async (page: number, key: string, tag?: string) => {
    setLoading(true);
    try {
      const res = await getPosts({
        current: page,
        pageSize,
        keyword: key,
        tag,
        status: 'published',
      });

      setPosts(res.data || []);
      setTotal(res.pagination?.total || 0);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  // Fetch tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await getTags();
        setTags(res || []);
      } catch (error) {
        console.error('Failed to fetch tags:', error);
      }
    };
    fetchTags();
  }, []);

  // Debounce search
  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      setCurrent(1);
      setKeyword(searchValue);
    }, 300);

    setDebounceTimer(timer);

    return () => clearTimeout(timer);
  }, [searchValue, debounceTimer]);

  // Fetch posts when keyword or tag changes
  useEffect(() => {
    fetchPosts(current, keyword, selectedTag);
  }, [keyword, selectedTag, current, fetchPosts]);

  const handleTagClick = (tagSlug: string) => {
    setCurrent(1);
    setSelectedTag(selectedTag === tagSlug ? undefined : tagSlug);
  };

  const handlePaginationChange = (page: number) => {
    setCurrent(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    setSearchValue('');
    setKeyword('');
    setSelectedTag(undefined);
    setCurrent(1);
  };

  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <div className={styles.blogPage}>
      <div className={styles.header}>
        <h1>Blog</h1>
        <p>Discover interesting articles and stories</p>
      </div>

      {/* Search bar */}
      <div className={styles.searchSection}>
        <Input
          placeholder="Search articles..."
          prefix={<SearchOutlined />}
          size="large"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          allowClear
          className={styles.searchInput}
        />
      </div>

      {/* Tags filter */}
      <div className={styles.tagsSection}>
        <div className={styles.tagsHeader}>
          <span>Filter by tags:</span>
          {selectedTag && (
            <Button type="text" size="small" onClick={handleClearFilters}>
              Clear filters
            </Button>
          )}
        </div>
        <div className={styles.tagsList}>
          {tags.map((tag) => (
            <Tag
              key={tag.id}
              className={selectedTag === tag.slug ? styles.activeTag : ''}
              onClick={() => handleTagClick(tag.slug)}
              style={{ cursor: 'pointer' }}
            >
              {tag.name}
              {tag.count ? ` (${tag.count})` : ''}
            </Tag>
          ))}
        </div>
      </div>

      {/* Posts grid */}
      <Spin spinning={loading} tip="Loading...">
        {posts.length > 0 ? (
          <>
            <Row gutter={[24, 24]} className={styles.postsGrid}>
              {posts.map((post) => (
                <Col key={post.id} xs={24} sm={12} lg={8}>
                  <Link to={`/blog/${post.slug}`}>
                    <Card
                      hoverable
                      className={styles.postCard}
                      cover={
                        <div className={styles.cardImage}>
                          <img
                            alt={post.title}
                            src={post.thumbnail}
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Image';
                            }}
                          />
                        </div>
                      }
                    >
                      <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>{post.title}</h3>
                        <p className={styles.cardExcerpt}>{truncateText(post.excerpt, 100)}</p>

                        <div className={styles.cardMeta}>
                          <span className={styles.author}>{post.author}</span>
                          <span className={styles.date}>{post.createdAt}</span>
                          <span className={styles.views}>{post.viewCount} views</span>
                        </div>

                        <div className={styles.cardTags}>
                          {post.tags.map((tag) => (
                            <Tag key={tag.id} size="small" color="blue">
                              {tag.name}
                            </Tag>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>

            {/* Pagination */}
            {total > pageSize && (
              <div className={styles.pagination}>
                <Pagination
                  current={current}
                  pageSize={pageSize}
                  total={total}
                  onChange={handlePaginationChange}
                  showSizeChanger={false}
                />
              </div>
            )}
          </>
        ) : (
          <Empty description="No articles found" />
        )}
      </Spin>
    </div>
  );
};

export default BlogPage;
