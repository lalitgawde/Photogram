import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  where,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import type { Post } from "@/types";

const COLLECTION_NAME = "POSTS";

export const createPost = async (post: Post) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), post);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Failed to create post");
  }
};

export const getPosts = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"));
    const posts = await getDocs(q);
    return posts;
  } catch (e) {
    console.error("Error getting documents posts: ", e);
    throw new Error("Failed to get posts");
  }
};

export const getPostByUserId = async (userId: string) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("userId", "==", userId),
    );
    const posts = await getDocs(q);
    return posts;
  } catch (e) {
    console.error("Error getting documents posts: ", e);
    throw new Error("Failed to get posts by user ID");
  }
};

export const getPostById = async (postId: string) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, postId);
    const post = await getDoc(docRef);
    return post;
  } catch (e) {
    console.error("Error getting documents posts: ", e);
    throw new Error("Failed to get post by ID");
  }
};

export const deletePost = async (postId: string) => {
  try {
    const docRef = deleteDoc(doc(db, COLLECTION_NAME, postId));
    return docRef;
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw new Error("Failed to delete post by ID");
  }
};
