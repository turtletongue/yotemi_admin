import { useEffect, useState } from "react";
import { Select, Table, Tbody, useMediaQuery } from "@chakra-ui/react";

import {
  LoadingHandler,
  PageHeading,
  Pagination,
  TableHead,
  TableRow,
} from "@components";
import {
  useListReviewsQuery,
  useModerateReviewMutation,
} from "@store/features/reviews";
import getReviewsTableData from "./get-reviews-table-data";

type ReviewTypeOption = "all" | "moderated" | "notModerated";

const typeToIsModerated = {
  all: undefined,
  moderated: true,
  notModerated: false,
} as const;

const Reviews = () => {
  const [isLessThan920] = useMediaQuery("(max-width: 920px)");

  const [page, setPage] = useState(1);
  const [type, setType] = useState<ReviewTypeOption>("notModerated");

  useEffect(() => {
    setPage(1);
  }, [type]);

  const {
    data: { items, totalItems } = { items: [], totalItems: 0 },
    isLoading,
  } = useListReviewsQuery({
    page,
    isModerated: typeToIsModerated[type],
  });

  const [moderate] = useModerateReviewMutation();

  return (
    <>
      <PageHeading title="Отзывы">
        <Select
          value={type}
          onChange={(event) => setType(event.target.value as ReviewTypeOption)}
          minW="15rem"
          maxW="20rem"
          marginTop={isLessThan920 ? "1rem" : 0}
        >
          <option value="all">Все</option>
          <option value="moderated">Опубликованные</option>
          <option value="notModerated">На модерации</option>
        </Select>
      </PageHeading>
      <LoadingHandler isLoading={isLoading}>
        <Table variant="simple" maxH="80vh" overflow="hidden">
          <TableHead
            titles={[
              "Оценка",
              "Комментарий",
              "Автор",
              "На модерации?",
              "Действия",
            ]}
          />
          <Tbody>
            {items.map((review) => (
              <TableRow
                key={review.id}
                data={getReviewsTableData(review, moderate)}
              />
            ))}
          </Tbody>
        </Table>
        <Pagination pageNumber={page} total={totalItems} setPage={setPage} />
      </LoadingHandler>
    </>
  );
};

export default Reviews;
