import { Button } from "@chakra-ui/react";

interface PaginationButtonProps {
  pageNumber: number;
  setPage: (page: number) => unknown;
  isActive?: boolean;
}

export const PaginationButton = ({
  pageNumber,
  setPage,
  isActive = false,
}: PaginationButtonProps) => {
  const onChangePage = () => {
    setPage(pageNumber);
  };

  return (
    <div onClick={onChangePage}>
      <Button
        color={isActive ? "#272541" : "#56527A"}
        backgroundColor={isActive ? "purple.100" : ""}
        cursor={isActive ? "default" : "pointer"}
        _hover={{ backgroundColor: isActive ? "purple.100" : "#D1D5DB" }}
        _focus={{ backgroundColor: isActive ? "purple.100" : "#D1D5DB" }}
        _active={{ backgroundColor: isActive ? "purple.100" : "#D1D5DB" }}
      >
        {pageNumber}
      </Button>
    </div>
  );
};

export default PaginationButton;
