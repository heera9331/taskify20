"use state";
import { useState, useEffect } from "react";
import { Post } from "@prisma/client";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  const savePosts = (newPosts: Post[]) => {
    setPosts(newPosts);
    localStorage.setItem("posts", JSON.stringify(newPosts));
  };

  const addPost = (post: Post) => {
    savePosts([...posts, post]);
  };

  const updatePost = (id: number, updates: Partial<Post>) => {
    console.log("put api request");
  };

  const deletePost = (id: number) => {
    console.log("delete api request");
    savePosts(posts.filter((post) => post.id !== id));
  };

  const getPosts = (id: number) => {
    posts.forEach((post: Post) => {
      if (post.id === id) {
        return post;
      }
    });
    return null;
  };

  return { posts, addPost, updatePost, deletePost, getPosts };
}
