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
  useBlockUserMutation,
  useListUsersQuery,
  useUnblockUserMutation,
} from "@store/features/users";
import useDebounce from "@hooks/use-debounce";
import getUsersTableData from "./get-users-table-data";

type UserTypeOption = "all" | "active" | "blocked";

const typeToIsBlocked = {
  all: undefined,
  active: false,
  blocked: true,
} as const;

const Users = () => {
  const [isLessThan920] = useMediaQuery("(max-width: 920px)");

  const [page, setPage] = useState(1);
  const [type, setType] = useState<UserTypeOption>("active");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  useEffect(() => {
    setPage(1);
  }, [type, debouncedSearch]);

  const {
    data: { items, totalItems } = { items: [], totalItems: 0 },
    isLoading,
  } = useListUsersQuery({
    page,
    isBlocked: typeToIsBlocked[type],
    search: debouncedSearch,
  });

  const [block] = useBlockUserMutation();
  const [unblock] = useUnblockUserMutation();

  return (
    <>
      <PageHeading title="Пользователи">
        <Select
          value={type}
          onChange={(event) => setType(event.target.value as UserTypeOption)}
          maxW="20rem"
          marginTop={isLessThan920 ? "1rem" : 0}
        >
          <option value="all">Все</option>
          <option value="active">Активные</option>
          <option value="blocked">Заблокированные</option>
        </Select>
        <Search
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </PageHeading>
      <LoadingHandler isLoading={isLoading}>
        <Table variant="simple" maxH="80vh" overflow="hidden">
          <TableHead
            titles={[
              "Аватар",
              "Имя пользователя",
              "Полное имя",
              "Заблокирован?",
              "Действия",
            ]}
          />
          <Tbody>
            {items.map((user) => (
              <TableRow
                key={user.id}
                data={getUsersTableData(user, block, unblock)}
              />
            ))}
          </Tbody>
        </Table>
        <Pagination pageNumber={page} total={totalItems} setPage={setPage} />
      </LoadingHandler>
    </>
  );
};

export default Users;
