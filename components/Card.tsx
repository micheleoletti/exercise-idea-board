import { Stack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export default function Card({ children }: PropsWithChildren<any>) {
  return (
    <Stack
      direction={"column"}
      p={"6"}
      spacing={"0.5rem"}
      bg={"white"}
      borderRadius={"lg"}
      boxShadow={"md"}
      minW={["100%", "25em"]}
    >
      {children}
    </Stack>
  );
}
