import { ReactNode } from "react";

import { PaginationButton } from "@components";

const getPageButtons = (
  pagesCount: number,
  setPage: (page: number) => unknown,
  activePageNumber?: number
) => {
  const buttons: ReactNode[] = [];

  for (let pageNumber = 1; pageNumber <= pagesCount; pageNumber++) {
    buttons.push(
      <PaginationButton
        key={pageNumber}
        pageNumber={pageNumber}
        isActive={pageNumber === activePageNumber}
        setPage={setPage}
      />
    );
  }

  return buttons;
};

export default getPageButtons;
