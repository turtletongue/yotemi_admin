import { Id, Language } from "@app/declarations";

export interface TopicLabel {
  id: Id;
  value: string;
  language: Language;
  createdAt: string;
  updatedAt: string;
}
