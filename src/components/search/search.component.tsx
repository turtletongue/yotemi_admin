import { ChangeEventHandler } from "react";
import { Input } from "@chakra-ui/react";

interface SearchProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Search = ({ value, onChange }: SearchProps) => {
  return (
    <Input
      type="search"
      placeholder="Поиск"
      minW="10rem"
      maxW="20rem"
      value={value}
      onChange={onChange}
    />
  );
};

export default Search;
