/**
 * Blog Models
 */

declare namespace Blog {
  interface Tag {
    id: string;
    name: string;
    slug: string;
    description?: string;
    createdAt: string;
  }

  interface Post {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    thumbnail: string;
    author: string;
    authorAvatar?: string;
    tags: Tag[];
    status: 'draft' | 'published';
    viewCount: number;
    createdAt: string;
    updatedAt: string;
  }

  interface PostFormData {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    thumbnail: string;
    tags: string[];
    status: 'draft' | 'published';
  }

  interface BlogState {
    posts: Post[];
    tags: Tag[];
    loading: boolean;
    error: string | null;
  }

  interface PaginationParams {
    current: number;
    pageSize: number;
  }

  interface FilterParams {
    tag?: string;
    keyword?: string;
    status?: 'draft' | 'published' | 'all';
  }
}

export default Blog;
