import { request } from 'umi';

/**
 * Get all posts
 */
export async function getPosts(params?: {
  current?: number;
  pageSize?: number;
  keyword?: string;
  tag?: string;
  status?: string;
}) {
  return request('/api/blog/posts', {
    method: 'GET',
    params,
  });
}

/**
 * Get post by slug
 */
export async function getPostBySlug(slug: string) {
  return request(`/api/blog/posts/${slug}`, {
    method: 'GET',
  });
}

/**
 * Create new post
 */
export async function createPost(data: Blog.PostFormData) {
  return request('/api/blog/posts', {
    method: 'POST',
    data,
  });
}

/**
 * Update post
 */
export async function updatePost(id: string, data: Partial<Blog.PostFormData>) {
  return request(`/api/blog/posts/${id}`, {
    method: 'PUT',
    data,
  });
}

/**
 * Delete post
 */
export async function deletePost(id: string) {
  return request(`/api/blog/posts/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Increase view count
 */
export async function increaseViewCount(id: string) {
  return request(`/api/blog/posts/${id}/view`, {
    method: 'PUT',
  });
}

/**
 * Get all tags
 */
export async function getTags() {
  return request('/api/blog/tags', {
    method: 'GET',
  });
}

/**
 * Create tag
 */
export async function createTag(data: { name: string; slug: string; description?: string }) {
  return request('/api/blog/tags', {
    method: 'POST',
    data,
  });
}

/**
 * Update tag
 */
export async function updateTag(id: string, data: { name: string; slug: string; description?: string }) {
  return request(`/api/blog/tags/${id}`, {
    method: 'PUT',
    data,
  });
}

/**
 * Delete tag
 */
export async function deleteTag(id: string) {
  return request(`/api/blog/tags/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Get related posts by tag
 */
export async function getRelatedPosts(slug: string, excludeId?: string) {
  return request('/api/blog/posts/related', {
    method: 'GET',
    params: {
      slug,
      excludeId,
    },
  });
}
