import { Flex } from "@chakra-ui/react";

import { DeleteConfirmationModal } from "@components";
import { ModerateTopicLabel, Topic } from "@store/features/topics";
import { booleanToLabelMap } from "@app/constants";
import { Id } from "@app/declarations";
import ModerateTopicModal from "./moderate-topic-modal";

export const getTopicsTableData = (
  topic: Topic,
  onModerate: (data: { id: Id; labels: ModerateTopicLabel[] }) => unknown,
  onDelete: (id: Id) => unknown
) => {
  return [
    {
      id: 1,
      node: topic.labels.map((label) => label.value).join(", "),
      title: "Названия",
    },
    {
      id: 2,
      node: booleanToLabelMap.get(!topic.isModerated),
      title: "На модерации?",
    },
    {
      id: 3,
      node: (
        <Flex gap="4">
          <ModerateTopicModal
            labels={topic.labels}
            onModerate={(labels) => onModerate({ id: topic.id, labels })}
          />
          <DeleteConfirmationModal onDelete={() => onDelete(topic.id)} />
        </Flex>
      ),
      title: "Действия",
    },
  ];
};

export default getTopicsTableData;
