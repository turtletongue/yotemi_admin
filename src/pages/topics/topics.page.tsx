import { useEffect, useState } from "react";
import { Select, Table, Tbody, useMediaQuery } from "@chakra-ui/react";

import {
  LoadingHandler,
  PageHeading,
  Pagination,
  Search,
  TableHead,
  TableRow,
} from "@components";
import {
  useDeleteTopicMutation,
  useListTopicsQuery,
  useModerateTopicMutation,
} from "@store/features/topics";
import useDebounce from "@hooks/use-debounce";
import getTopicsTableData from "./get-topics-table-data";

type TopicTypeOption = "all" | "moderated" | "notModerated";

const typeToIsModerated = {
  all: undefined,
  moderated: true,
  notModerated: false,
} as const;

const Topics = () => {
  const [isLessThan920] = useMediaQuery("(max-width: 920px)");

  const [page, setPage] = useState(1);
  const [type, setType] = useState<TopicTypeOption>("notModerated");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  useEffect(() => {
    setPage(1);
  }, [type, debouncedSearch]);

  const {
    data: { items, totalItems } = { items: [], totalItems: 0 },
    isLoading,
  } = useListTopicsQuery({
    page,
    label: debouncedSearch,
    isModerated: typeToIsModerated[type],
  });

  const [moderate] = useModerateTopicMutation();
  const [deleteTopic] = useDeleteTopicMutation();

  return (
    <>
      <PageHeading title="Темы интервью">
        <Select
          value={type}
          onChange={(event) => setType(event.target.value as TopicTypeOption)}
          minW="15rem"
          maxW="20rem"
          marginTop={isLessThan920 ? "1rem" : 0}
        >
          <option value="all">Все</option>
          <option value="moderated">Опубликованные</option>
          <option value="notModerated">На модерации</option>
        </Select>
        <Search
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </PageHeading>
      <LoadingHandler isLoading={isLoading}>
        <Table variant="simple" maxH="80vh" overflow="hidden">
          <TableHead titles={["Названия", "На модерации?", "Действия"]} />
          <Tbody>
            {items.map((topic) => (
              <TableRow
                key={topic.id}
                data={getTopicsTableData(topic, moderate, deleteTopic)}
              />
            ))}
          </Tbody>
        </Table>
        <Pagination pageNumber={page} total={totalItems} setPage={setPage} />
      </LoadingHandler>
    </>
  );
};

export default Topics;
