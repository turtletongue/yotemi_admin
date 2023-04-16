import { ReactNode } from "react";
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";

interface PageHeadingProps {
  title?: string;
  buttonsContainer?: ReactNode;
  children?: ReactNode;
}

const PageHeading = ({
  title,
  buttonsContainer,
  children,
}: PageHeadingProps) => {
  const [isLessThan920] = useMediaQuery("(max-width: 920px)");

  return (
    <>
      {title && (
        <Box width="full" paddingX="1.5rem" paddingY="1rem">
          <Flex
            w="full"
            justifyContent="space-between"
            alignItems="center"
            direction={isLessThan920 ? "column" : "row"}
          >
            <Flex
              width="full"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize="md" color="#272541" marginRight="1rem">
                {title}
              </Text>
              {buttonsContainer}
            </Flex>
            <Flex
              width={isLessThan920 ? "full" : "auto"}
              direction={isLessThan920 ? "column" : "row"}
              gap="4"
            >
              {children}
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default PageHeading;
