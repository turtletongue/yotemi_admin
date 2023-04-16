import { Link, useMatch } from "react-router-dom";
import { Flex, Tooltip } from "@chakra-ui/react";

import { NavigationLinkData } from "@app/navigation-links";

interface NavigationLinkProps {
  data: NavigationLinkData;
}

export const NavigationLink = ({ data }: NavigationLinkProps) => {
  const isActive = !!useMatch(data.href);

  return (
    <Tooltip label={data.text} placement="right">
      <Link to={data.href}>
        <Flex
          padding="1rem"
          justifyContent="center"
          alignItems="center"
          _hover={{ backgroundColor: "#3f2e54" }}
        >
          {data.icon(isActive)}
        </Flex>
      </Link>
    </Tooltip>
  );
};

export default NavigationLink;
