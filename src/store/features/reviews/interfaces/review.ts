import { User } from "@store/features/users";
import { Id } from "@app/declarations";

export interface Review {
  id: Id;
  points: number;
  comment: string;
  reviewer: User;
  userId: Id;
  isModerated: boolean;
  createdAt: string;
  updatedAt: string;
}
