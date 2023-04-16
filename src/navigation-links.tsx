import { ReactNode } from "react";
import { Icon } from "@chakra-ui/react";
import { MdOutlineReviews, MdOutlineCategory } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { GoSignOut } from "react-icons/go";

export interface NavigationLinkData {
  icon: (isActive: boolean) => ReactNode;
  text: string;
  href: string;
}

const navigationLinks: NavigationLinkData[] = [
  {
    icon: () => <Icon as={FiUsers} w={6} h={6} color="#EFEFEF" />,
    href: "/users",
    text: "Пользователи",
  },
  {
    icon: () => <Icon as={MdOutlineReviews} w={6} h={6} color="#EFEFEF" />,
    href: "/reviews",
    text: "Отзывы",
  },
  {
    icon: () => <Icon as={MdOutlineCategory} w={6} h={6} color="#EFEFEF" />,
    href: "/topics",
    text: "Темы интервью",
  },
  {
    icon: () => <Icon as={GoSignOut} w={6} h={6} color="#EFEFEF" />,
    href: "/sign-out",
    text: "Выход",
  },
];

export default navigationLinks;
