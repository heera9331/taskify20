export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  posts: Post[]; // Related posts
  comments: Comment[]; // Related comments
  notes: Note[]; // Related notes
  tasks: Task[]; // Related tasks
}

export interface Post {
  id: number;
  title: string;
  name: string; // Slug
  content: string;
  postType: PostType;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  user: User; // Related user
  comments: Comment[]; // Related comments
  tags: Tag[]; // Related tags
}
export interface Task {
  id: number;
  title: string;
  content: string;
  parentId?: number | null; // Nullable parent ID for hierarchical tasks
  parent?: Task | null; // Related parent task
  children?: Task[]; // Array of child tasks
  userId: number;
  user: User; // Related user
  comments: Comment[]; // Related comments
  tags: Tag[]; // Related tags
  priority: number; // Priority level
  status: string;
  dueDate: Date;
  isArchived: boolean;
  isDeleted: boolean;
  isPublic: boolean;
  category?: string | null; // Optional category
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: number;
  title: string;
  description: string;
  parentId?: number | null; // Nullable parent ID for hierarchical categories
  parent?: Category | null; // Related parent category
  children?: Category[]; // Array of child categories
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: number;
  content: string;
  postId: number;
  userId: number;
  parentId: number;
  post: Post; // Related post
  user: User; // Related user
  noteId?: number | null; // Nullable related note ID
  note?: Note | null; // Related note
  taskId?: number | null; // Nullable related task ID
  task?: Task | null; // Related task
}

export interface Note {
  id: number;
  title: string;
  content: string;
  parentId?: number | null; // Nullable parent ID for hierarchical notes
  parent?: Note | null; // Related parent note
  children?: Note[]; // Array of child notes
  userId: number;
  user: User; // Related user
  comments: Comment[]; // Related comments
  tags: Tag[]; // Related tags
  isArchived: boolean;
  isDeleted: boolean;
  isPublic: boolean;
  category?: string | null; // Optional category
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: number;
  name: string; // Unique tag name
  posts: Post[]; // Related posts
  notes: Note[]; // Related notes
  tasks: Task[]; // Related tasks
}

export enum PostType {
  POST = "POST",
  NOTE = "NOTE",
  TASK = "TASK",
  ATTACHMENT = "ATTACHMENT",
}
