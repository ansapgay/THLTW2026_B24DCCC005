import { Request, Response } from 'express';
import slug from 'slug';

// Mock data
let mockTags: Blog.Tag[] = [
  {
    id: '1',
    name: 'React',
    slug: 'react',
    description: 'React framework',
    createdAt: '2026-01-01',
  },
  {
    id: '2',
    name: 'TypeScript',
    slug: 'typescript',
    description: 'TypeScript language',
    createdAt: '2026-01-01',
  },
  {
    id: '3',
    name: 'UmiJS',
    slug: 'umijs',
    description: 'UmiJS framework',
    createdAt: '2026-01-01',
  },
  {
    id: '4',
    name: 'Web Development',
    slug: 'web-development',
    description: 'Web development topics',
    createdAt: '2026-01-01',
  },
];

let mockPosts: Blog.Post[] = [
  {
    id: '1',
    title: 'Getting Started with React',
    slug: 'getting-started-with-react',
    content: `# Getting Started with React

React is a JavaScript library for building user interfaces with reusable components.

## Key Concepts

- **Components**: Reusable UI elements
- **JSX**: JavaScript extension syntax
- **State**: Component data that changes
- **Props**: Component properties

## Example

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
\`\`\`

React makes it painless to create interactive UIs.`,
    excerpt: 'Learn the basics of React and start building interactive applications.',
    thumbnail: 'https://via.placeholder.com/300x200?text=React',
    author: 'John Developer',
    authorAvatar: 'https://via.placeholder.com/50?text=JD',
    tags: [mockTags[0], mockTags[3]],
    status: 'published',
    viewCount: 125,
    createdAt: '2026-04-15',
    updatedAt: '2026-04-15',
  },
  {
    id: '2',
    title: 'TypeScript Best Practices',
    slug: 'typescript-best-practices',
    content: `# TypeScript Best Practices

TypeScript is a typed superset of JavaScript that compiles to clean, readable JavaScript code.

## Benefits

- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Advanced autocomplete and refactoring
- **Self-Documenting**: Types serve as documentation

## Interfaces

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}
\`\`\`

TypeScript helps you write more maintainable code.`,
    excerpt: 'Master TypeScript and write safer, more maintainable code.',
    thumbnail: 'https://via.placeholder.com/300x200?text=TypeScript',
    author: 'Jane Developer',
    authorAvatar: 'https://via.placeholder.com/50?text=JD2',
    tags: [mockTags[1], mockTags[3]],
    status: 'published',
    viewCount: 98,
    createdAt: '2026-04-10',
    updatedAt: '2026-04-10',
  },
  {
    id: '3',
    title: 'Building with UmiJS',
    slug: 'building-with-umijs',
    content: `# Building with UmiJS

UmiJS is a React framework that provides a complete solution for enterprise applications.

## Features

- **Routing**: Built-in route-based code splitting
- **Mock**: Integrated mock server
- **Build**: Optimized builds out of the box

## Getting Started

\`\`\`bash
npm create umi@latest
npm run dev
\`\`\`

UmiJS simplifies building large-scale React applications.`,
    excerpt: 'Discover UmiJS and build production-ready React applications.',
    thumbnail: 'https://via.placeholder.com/300x200?text=UmiJS',
    author: 'Code Master',
    authorAvatar: 'https://via.placeholder.com/50?text=CM',
    tags: [mockTags[2], mockTags[3]],
    status: 'published',
    viewCount: 156,
    createdAt: '2026-04-05',
    updatedAt: '2026-04-05',
  },
  {
    id: '4',
    title: 'Advanced React Hooks',
    slug: 'advanced-react-hooks',
    content: `# Advanced React Hooks

React Hooks allow you to use state and other React features without writing a class.

## Common Hooks

- **useState**: Manage component state
- **useEffect**: Perform side effects
- **useContext**: Access context values
- **useReducer**: Complex state management

## Custom Hooks

You can extract component logic into reusable functions.

\`\`\`typescript
const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  // Hook implementation
  return width;
};
\`\`\`

Hooks make React code more reusable and easier to test.`,
    excerpt: 'Master advanced React patterns with hooks.',
    thumbnail: 'https://via.placeholder.com/300x200?text=React+Hooks',
    author: 'John Developer',
    authorAvatar: 'https://via.placeholder.com/50?text=JD',
    tags: [mockTags[0]],
    status: 'published',
    viewCount: 203,
    createdAt: '2026-03-28',
    updatedAt: '2026-03-28',
  },
  {
    id: '5',
    title: 'Web Performance Optimization',
    slug: 'web-performance-optimization',
    content: `# Web Performance Optimization

Performance is crucial for user experience and SEO.

## Key Metrics

- **FCP**: First Contentful Paint
- **LCP**: Largest Contentful Paint
- **CLS**: Cumulative Layout Shift

## Optimization Techniques

1. Code splitting
2. Lazy loading
3. Image optimization
4. Caching strategies

Learn to build fast, responsive web applications.`,
    excerpt: 'Improve your web application performance.',
    thumbnail: 'https://via.placeholder.com/300x200?text=Performance',
    author: 'Performance Expert',
    authorAvatar: 'https://via.placeholder.com/50?text=PE',
    tags: [mockTags[3]],
    status: 'published',
    viewCount: 87,
    createdAt: '2026-03-20',
    updatedAt: '2026-03-20',
  },
  {
    id: '6',
    title: 'REST API Design',
    slug: 'rest-api-design',
    content: `# REST API Design

Designing good REST APIs is essential for modern web development.

## REST Principles

- **Resources**: Use nouns in URLs
- **Methods**: Use HTTP verbs (GET, POST, PUT, DELETE)
- **Status Codes**: Use appropriate HTTP status codes

## Best Practices

- Use versioning
- Provide pagination
- Use consistent naming conventions

\`\`\`
GET /api/v1/users
POST /api/v1/users
PUT /api/v1/users/:id
DELETE /api/v1/users/:id
\`\`\`

Good API design leads to better integrations.`,
    excerpt: 'Learn how to design scalable REST APIs.',
    thumbnail: 'https://via.placeholder.com/300x200?text=REST+API',
    author: 'API Architect',
    authorAvatar: 'https://via.placeholder.com/50?text=AA',
    tags: [mockTags[3]],
    status: 'published',
    viewCount: 145,
    createdAt: '2026-03-15',
    updatedAt: '2026-03-15',
  },
  {
    id: '7',
    title: 'State Management with Redux',
    slug: 'state-management-with-redux',
    content: `# State Management with Redux

Redux provides a predictable state container for JavaScript apps.

## Core Concepts

- **Store**: Single source of truth
- **Actions**: Events that describe changes
- **Reducers**: Functions that process actions
- **Selectors**: Functions to extract state

## Getting Started

Install Redux and React-Redux packages.

Redux helps manage complex application state.`,
    excerpt: 'Master state management with Redux.',
    thumbnail: 'https://via.placeholder.com/300x200?text=Redux',
    author: 'Jane Developer',
    authorAvatar: 'https://via.placeholder.com/50?text=JD2',
    tags: [mockTags[0]],
    status: 'draft',
    viewCount: 0,
    createdAt: '2026-04-20',
    updatedAt: '2026-04-20',
  },
  {
    id: '8',
    title: 'CSS Grid Layout',
    slug: 'css-grid-layout',
    content: `# CSS Grid Layout

CSS Grid is a powerful layout system for building responsive designs.

## Grid Basics

- **Grid Container**: Define with \`display: grid\`
- **Grid Items**: Children of the container
- **Grid Lines**: Horizontal and vertical dividers
- **Grid Tracks**: Rows and columns

## Example

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
}
\`\`\`

Grid makes creating complex layouts simple.`,
    excerpt: 'Learn CSS Grid for modern responsive layouts.',
    thumbnail: 'https://via.placeholder.com/300x200?text=CSS+Grid',
    author: 'CSS Expert',
    authorAvatar: 'https://via.placeholder.com/50?text=CE',
    tags: [mockTags[3]],
    status: 'published',
    viewCount: 112,
    createdAt: '2026-03-10',
    updatedAt: '2026-03-10',
  },
  {
    id: '9',
    title: 'Docker Containerization',
    slug: 'docker-containerization',
    content: `# Docker Containerization

Docker simplifies application deployment and scaling.

## What is Docker?

Docker is a containerization platform that packages applications and dependencies.

## Key Concepts

- **Images**: Templates for containers
- **Containers**: Running instances
- **Volumes**: Persistent storage
- **Networks**: Container communication

Docker enables consistent development and production environments.`,
    excerpt: 'Get started with Docker containerization.',
    thumbnail: 'https://via.placeholder.com/300x200?text=Docker',
    author: 'DevOps Engineer',
    authorAvatar: 'https://via.placeholder.com/50?text=DE',
    tags: [mockTags[3]],
    status: 'draft',
    viewCount: 0,
    createdAt: '2026-04-21',
    updatedAt: '2026-04-21',
  },
  {
    id: '10',
    title: 'Functional Programming',
    slug: 'functional-programming',
    content: `# Functional Programming

Functional programming is a programming paradigm that treats computation as the evaluation of functions.

## Principles

- **Pure Functions**: No side effects
- **Immutability**: Don't modify data
- **First-Class Functions**: Treat functions as values
- **Composition**: Combine functions

## Benefits

- Easier testing
- Predictable code
- Better performance

Functional programming leads to more maintainable code.`,
    excerpt: 'Understand functional programming principles.',
    thumbnail: 'https://via.placeholder.com/300x200?text=Functional',
    author: 'Code Master',
    authorAvatar: 'https://via.placeholder.com/50?text=CM',
    tags: [mockTags[1], mockTags[3]],
    status: 'published',
    viewCount: 89,
    createdAt: '2026-03-05',
    updatedAt: '2026-03-05',
  },
];

// API handlers
export default {
  // Get posts
  'GET /api/blog/posts': (req: Request, res: Response) => {
    const { current = 1, pageSize = 9, keyword = '', tag = '', status = 'all' } = req.query;

    let filtered = mockPosts;

    // Filter by status
    if (status && status !== 'all') {
      filtered = filtered.filter((post) => post.status === status);
    }

    // Filter by tag
    if (tag) {
      filtered = filtered.filter((post) =>
        post.tags.some((t) => t.slug === tag || t.name === tag)
      );
    }

    // Filter by keyword
    if (keyword) {
      const kw = (keyword as string).toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(kw) ||
          post.excerpt.toLowerCase().includes(kw) ||
          post.content.toLowerCase().includes(kw)
      );
    }

    // Sort by created date descending
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Pagination
    const p = parseInt(current as string);
    const ps = parseInt(pageSize as string);
    const start = (p - 1) * ps;
    const end = start + ps;

    const data = filtered.slice(start, end);
    const total = filtered.length;

    res.status(200).json({
      data,
      pagination: {
        current: p,
        pageSize: ps,
        total,
        totalPage: Math.ceil(total / ps),
      },
    });
  },

  // Get post by slug
  'GET /api/blog/posts/:slug': (req: Request, res: Response) => {
    const { slug } = req.params;
    const post = mockPosts.find((p) => p.slug === slug);

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    res.status(200).json(post);
  },

  // Create post
  'POST /api/blog/posts': (req: Request, res: Response) => {
    const { title, slug: inputSlug, content, excerpt, thumbnail, tags, status } = req.body;

    const newPost: Blog.Post = {
      id: Date.now().toString(),
      title,
      slug: inputSlug || slug(title),
      content,
      excerpt,
      thumbnail,
      author: 'You',
      tags: tags.map((tagId: string) => mockTags.find((t) => t.id === tagId)!).filter(Boolean),
      status,
      viewCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    mockPosts.push(newPost);
    res.status(201).json(newPost);
  },

  // Update post
  'PUT /api/blog/posts/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, slug: inputSlug, content, excerpt, thumbnail, tags, status } = req.body;

    const post = mockPosts.find((p) => p.id === id);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    post.title = title || post.title;
    post.slug = inputSlug || post.slug;
    post.content = content || post.content;
    post.excerpt = excerpt || post.excerpt;
    post.thumbnail = thumbnail || post.thumbnail;
    post.tags = tags
      ? tags.map((tagId: string) => mockTags.find((t) => t.id === tagId)!).filter(Boolean)
      : post.tags;
    post.status = status || post.status;
    post.updatedAt = new Date().toISOString().split('T')[0];

    res.status(200).json(post);
  },

  // Delete post
  'DELETE /api/blog/posts/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const index = mockPosts.findIndex((p) => p.id === id);

    if (index === -1) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    const deleted = mockPosts.splice(index, 1);
    res.status(200).json(deleted[0]);
  },

  // Increase view count
  'PUT /api/blog/posts/:id/view': (req: Request, res: Response) => {
    const { id } = req.params;
    const post = mockPosts.find((p) => p.id === id);

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    post.viewCount += 1;
    res.status(200).json(post);
  },

  // Get tags
  'GET /api/blog/tags': (req: Request, res: Response) => {
    const tagsWithCount = mockTags.map((tag) => {
      const count = mockPosts.filter((post) =>
        post.tags.some((t) => t.id === tag.id)
      ).length;
      return { ...tag, count };
    });

    res.status(200).json(tagsWithCount);
  },

  // Create tag
  'POST /api/blog/tags': (req: Request, res: Response) => {
    const { name, slug: inputSlug, description } = req.body;

    const newTag: Blog.Tag = {
      id: Date.now().toString(),
      name,
      slug: inputSlug || slug(name),
      description,
      createdAt: new Date().toISOString().split('T')[0],
    };

    mockTags.push(newTag);
    res.status(201).json(newTag);
  },

  // Update tag
  'PUT /api/blog/tags/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, slug: inputSlug, description } = req.body;

    const tag = mockTags.find((t) => t.id === id);
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    tag.name = name || tag.name;
    tag.slug = inputSlug || tag.slug;
    tag.description = description || tag.description;

    res.status(200).json(tag);
  },

  // Delete tag
  'DELETE /api/blog/tags/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const index = mockTags.findIndex((t) => t.id === id);

    if (index === -1) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    // Remove tag from posts
    mockPosts.forEach((post) => {
      post.tags = post.tags.filter((t) => t.id !== id);
    });

    const deleted = mockTags.splice(index, 1);
    res.status(200).json(deleted[0]);
  },

  // Get related posts
  'GET /api/blog/posts/related': (req: Request, res: Response) => {
    const { slug: postSlug, excludeId } = req.query;

    const post = mockPosts.find((p) => p.slug === postSlug);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    const relatedPosts = mockPosts
      .filter(
        (p) =>
          p.id !== excludeId &&
          p.id !== post.id &&
          p.status === 'published' &&
          p.tags.some((t) => post.tags.some((pt) => pt.id === t.id))
      )
      .slice(0, 3);

    res.status(200).json(relatedPosts);
  },
};
