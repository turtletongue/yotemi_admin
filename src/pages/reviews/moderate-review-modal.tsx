import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  FormControl,
  Textarea,
  FormLabel,
} from "@chakra-ui/react";

import { EditButton } from "@components";

interface ModerateReviewModalProps {
  comment: string;
  onModerate?: (comment: string) => void;
}

export const ModerateReviewModal = ({
  comment,
  onModerate,
}: ModerateReviewModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [moderatedComment, setModeratedComment] = useState(comment);

  const onSubmit = () => {
    onModerate?.(moderatedComment);
    onClose();
  };

  return (
    <>
      <EditButton onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Модерация отзыва</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel htmlFor="comment">Комментарий</FormLabel>
              <Textarea
                id="comment"
                value={moderatedComment}
                onChange={(event) => setModeratedComment(event.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Отмена
            </Button>
            <Button colorScheme="green" onClick={onSubmit}>
              Опубликовать
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModerateReviewModal;
