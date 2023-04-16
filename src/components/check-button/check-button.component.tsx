import { Button, Icon } from "@chakra-ui/react";
import { BsCheckLg } from "react-icons/bs";

interface CheckButtonProps {
  onClick?: (...args: unknown[]) => void;
}

const CheckButton = ({ onClick }: CheckButtonProps) => {
  return (
    <Button marginTop="1rem" colorScheme="success" onClick={onClick}>
      <Icon as={BsCheckLg} w={4} h={4} />
    </Button>
  );
};

export default CheckButton;
