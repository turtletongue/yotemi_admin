import {
  Button,
  Modal,
  Text,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { BlockControlButton } from "@components";

interface BlockUserConfirmationModalProps {
  isBlocked: boolean;
  onBlock?: () => void;
  onUnblock?: () => void;
}

export const DeleteConfirmationModal = ({
  isBlocked,
  onBlock,
  onUnblock,
}: BlockUserConfirmationModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onBlockControlButtonClicked = () => {
    if (isBlocked) {
      onUnblock?.();
    } else {
      onBlock?.();
    }

    onClose();
  };

  return (
    <>
      <BlockControlButton isBlocked={isBlocked} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Вы действительно хотите продолжить?</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text fontSize="md">
              Пользователь будет{" "}
              {isBlocked
                ? "разблокирован и сможет войти в аккаунт."
                : "заблокирован и не сможет войти в аккаунт."}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Отмена
            </Button>
            <Button colorScheme="red" onClick={onBlockControlButtonClicked}>
              {isBlocked ? "Разблокировать" : "Заблокировать"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteConfirmationModal;
