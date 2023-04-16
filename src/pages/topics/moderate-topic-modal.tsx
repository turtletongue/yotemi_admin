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
  FormLabel,
  VStack,
  Flex,
  Input,
  Select,
} from "@chakra-ui/react";

import { DeleteButton, EditButton } from "@components";
import { ModerateTopicLabel, TopicLabel } from "@store/features/topics";
import { Id, Language } from "@app/declarations";

interface ModerateTopicModalProps {
  labels: TopicLabel[];
  onModerate?: (labels: ModerateTopicLabel[]) => void;
}

const languages = ["en", "ru"] as const;

export const ModerateTopicModal = ({
  labels,
  onModerate,
}: ModerateTopicModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [moderatedLabels, setModeratedLabels] = useState<
    (ModerateTopicLabel & { key: Id })[]
  >(labels.map((label) => ({ ...label, key: label.id })));

  const onSubmit = () => {
    onModerate?.(
      moderatedLabels.map((label) => ({
        id: label.id,
        value: label.value,
        language: label.language,
      }))
    );
    onClose();
  };

  const addLabel = () => {
    setModeratedLabels((labels) => [
      ...labels,
      {
        key: Date.now(),
        value: "",
        language:
          languages.find(
            (language) =>
              !moderatedLabels.find((label) => label.language === language)
          ) ?? "en",
      },
    ]);
  };

  const updateLabelValue = (key: Id, value: string) => {
    setModeratedLabels((labels) =>
      labels.map((label) => (label.key === key ? { ...label, value } : label))
    );
  };

  const updateLabelLanguage = (key: Id, language: Language) => {
    setModeratedLabels((labels) =>
      labels.map((label) =>
        label.key === key ? { ...label, language } : label
      )
    );
  };

  const removeLabel = (key: Id) => {
    setModeratedLabels((labels) => labels.filter((label) => label.key !== key));
  };

  return (
    <>
      <EditButton onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Модерация темы</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex
              width="full"
              alignItems="center"
              justifyContent="space-between"
              mb="1rem"
            >
              <FormLabel>Названия</FormLabel>
              <Button
                onClick={addLabel}
                isDisabled={languages.length === moderatedLabels.length}
              >
                Добавить
              </Button>
            </Flex>
            <VStack gap={4}>
              {moderatedLabels.map((label) => {
                return (
                  <Flex
                    key={label.key}
                    width="full"
                    alignItems="center"
                    gap={2}
                  >
                    <Input
                      value={label.value}
                      onChange={(event) =>
                        updateLabelValue(label.key, event.target.value)
                      }
                      placeholder="Перевод"
                    />
                    <Select
                      value={label.language}
                      onChange={(event) =>
                        updateLabelLanguage(
                          label.key,
                          event.target.value as Language
                        )
                      }
                    >
                      <option selected value="ru">
                        Русский
                      </option>
                      <option value="en">Английский</option>
                    </Select>
                    <DeleteButton
                      onClick={() => removeLabel(label.key)}
                      marginLeft="0"
                      marginTop="0"
                    />
                  </Flex>
                );
              })}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Отмена
            </Button>
            <Button
              colorScheme="green"
              onClick={onSubmit}
              isDisabled={moderatedLabels.length === 0}
            >
              Опубликовать
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModerateTopicModal;
