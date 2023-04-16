import { Id } from "@app/declarations";
import { TopicLabel } from "./topic-label";

export interface Topic {
  id: Id;
  labels: TopicLabel[];
  isModerated: boolean;
  createdAt: string;
  updatedAt: string;
}
