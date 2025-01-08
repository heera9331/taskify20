import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

// User Schema
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  note: [{ type: Schema.Types.ObjectId, ref: "Note" }],
  post: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  task: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});

// Category Schema
const CategorySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  parentId: { type: Schema.Types.ObjectId, ref: "Category" },
  other_category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Comment Schema
const CommentSchema = new Schema({
  content: { type: String, required: true },
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  parentId: { type: Schema.Types.ObjectId, ref: "Comment", default: null },
  noteId: { type: Schema.Types.ObjectId, ref: "Note", default: null },
  task: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

// Note Schema
const NoteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String },
  parentId: { type: Schema.Types.ObjectId, ref: "Note", default: null },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  isArchived: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  isPublic: { type: Boolean, default: false },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  other_note: [{ type: Schema.Types.ObjectId, ref: "Note" }],
  tag: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
});

// Post Schema
const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  postType: {
    type: String,
    enum: ["POST", "NOTE", "TASK", "ATTACHMENT"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, unique: true, required: true },
  comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  tag: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
});

// Tag Schema
const TagSchema = new Schema({
  name: { type: String, unique: true, required: true },
  task: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  post: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  note: [{ type: Schema.Types.ObjectId, ref: "Note" }],
});

// Task Schema
const TaskSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String },
  parentId: { type: Schema.Types.ObjectId, ref: "Task", default: null },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  priority: { type: Number, default: 0 },
  status: { type: String, required: true },
  dueDate: { type: Date, required: true },
  isArchived: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  isPublic: { type: Boolean, default: false },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  other_task: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  tag: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
});

// Export Models
export const User = model("User", UserSchema);
export const Category = model("Category", CategorySchema);
export const Comment = model("Comment", CommentSchema);
export const Note = model("Note", NoteSchema);
export const Post = model("Post", PostSchema);
export const Tag = model("Tag", TagSchema);
export const Task = model("Task", TaskSchema);
