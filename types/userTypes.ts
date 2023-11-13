import { Like } from "@prisma/client";

export type UserData = {
  username?: string;
  email?: string;
  password?: string;
};

enum PostType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}

export type Post = {
  id: number;
  content: string;
  userId: number;
  mediaUrl?: string;
  gradient?: string;
  type: PostType;
  user: User;
  likes?: Like[];
};

export type UserStats = {
  posts: number;
  followers: number;
  following: number;
};

export type User = {
  id: number;
  username: string;
  email: string;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  posts?: Post[];
};
