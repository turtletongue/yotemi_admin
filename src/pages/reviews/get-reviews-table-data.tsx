import { Text } from "@chakra-ui/react";

import { Review } from "@store/features/reviews";
import { booleanToLabelMap } from "@app/constants";
import { Id } from "@app/declarations";
import ModerateReviewModal from "./moderate-review-modal";

export const getReviewsTableData = (
  review: Review,
  onModerate: (data: { id: Id; comment: string }) => unknown
) => {
  return [
    { id: 1, node: review.points, title: "Оценка" },
    {
      id: 2,
      node: <Text maxWidth="20rem">{review.comment || "—"}</Text>,
      title: "Комментарий",
    },
    { id: 3, node: review.reviewer.username, title: "Автор" },
    {
      id: 4,
      node: booleanToLabelMap.get(!review.isModerated),
      title: "На модерации?",
    },
    {
      id: 5,
      node: (
        <ModerateReviewModal
          comment={review.comment}
          onModerate={(comment) => onModerate({ id: review.id, comment })}
        />
      ),
      title: "Действия",
    },
  ];
};

export default getReviewsTableData;
