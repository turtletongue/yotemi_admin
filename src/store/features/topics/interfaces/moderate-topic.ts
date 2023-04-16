import { Id } from "@app/declarations";
import { ModerateTopicLabel } from "./moderate-topic-label";

export interface ModerateTopic {
  id: Id;
  labels: ModerateTopicLabel[];
  isModerated?: boolean;
}
