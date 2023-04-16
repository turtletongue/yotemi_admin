import { Avatar } from "@chakra-ui/react";

import { User } from "@store/features/users";
import { booleanToLabelMap } from "@app/constants";
import { Id } from "@app/declarations";
import BlockUserConfirmationModal from "./block-user-confirmation-modal";

export const getAdminsTableData = (
  user: User,
  onBlock: (id: Id) => unknown,
  onUnblock: (id: Id) => unknown
) => {
  return [
    {
      id: 1,
      node: <Avatar size="md" src={user.avatarPath ?? undefined} />,
      title: "Аватар",
    },
    { id: 2, node: user.username, title: "Имя пользователя" },
    { id: 3, node: user.fullName, title: "Полное имя" },
    {
      id: 4,
      node: booleanToLabelMap.get(user.isBlocked),
      title: "Заблокирован?",
    },
    {
      id: 5,
      node: (
        <BlockUserConfirmationModal
          isBlocked={user.isBlocked}
          onBlock={() => onBlock?.(user.id)}
          onUnblock={() => onUnblock?.(user.id)}
        />
      ),
      title: "Действия",
    },
  ];
};

export default getAdminsTableData;
