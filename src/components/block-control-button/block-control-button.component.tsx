import { Button, Icon } from "@chakra-ui/react";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";

interface BlockControlButtonProps {
  isBlocked?: boolean;
  isDisabled?: boolean;
  onClick?: (...args: unknown[]) => unknown;
}

const BlockControlButton = ({
  onClick,
  isBlocked,
  isDisabled,
}: BlockControlButtonProps) => {
  return (
    <Button
      isDisabled={isDisabled}
      colorScheme="gray"
      marginLeft="1rem"
      marginTop="1rem"
      onClick={onClick}
    >
      <Icon
        as={isBlocked ? AiOutlineLock : AiOutlineUnlock}
        w={6}
        h={6}
        color="#272541"
      />
    </Button>
  );
};

export default BlockControlButton;
