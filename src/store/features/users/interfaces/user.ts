import { Topic } from "@store/features/topics";
import { Id } from "@app/declarations";

export interface User {
  id: Id;
  accountAddress: string;
  username: string;
  fullName: string;
  firstName: string;
  lastName: string;
  biography: string;
  topics: Topic[];
  avatarPath: string | null;
  coverPath: string | null;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}
