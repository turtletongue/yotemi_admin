import { VStack } from "@chakra-ui/react";

import { NavigationLink } from "@components";
import { NavigationLinkData } from "@app/navigation-links";

interface NavbarProps {
  links: NavigationLinkData[];
}

export const Navbar = ({ links }: NavbarProps) => {
  return (
    <VStack
      direction="column"
      backgroundColor="#61318F"
      height="100vh"
      width="3.5rem"
      alignItems="center"
      spacing={0}
      position="fixed"
      top={0}
      left={0}
    >
      {links.map((link) => (
        <NavigationLink key={link.text} data={link} />
      ))}
    </VStack>
  );
};

export default Navbar;
