import { Button, Icon } from "@chakra-ui/react";
import { BsTrashFill } from "react-icons/bs";

interface DeleteButtonProps {
  isDisabled?: boolean;
  onClick?: (...args: unknown[]) => unknown;
  marginLeft?: string;
  marginTop?: string;
}

const DeleteButton = ({
  onClick,
  isDisabled,
  marginLeft = "1rem",
  marginTop = "1rem",
}: DeleteButtonProps) => {
  return (
    <Button
      isDisabled={isDisabled}
      colorScheme="red"
      marginLeft={marginLeft}
      marginTop={marginTop}
      onClick={onClick}
    >
      <Icon as={BsTrashFill} w={3} h={3} />
    </Button>
  );
};

export default DeleteButton;
