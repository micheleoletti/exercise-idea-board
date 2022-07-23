import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

export default function SignIn() {
  const router = useRouter();

  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  function signInAndRedirect() {
    signIn!(email, password).then((response) => {
      if (response.success) router.push("/");
      else {
        setErrorMessage(response.message!);
      }
    });
  }

  return (
    <>
      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        minH={"100vh"}
        minW={"100vw"}
        bg={"gray.100"}
      >
        <Stack
          direction={"column"}
          p={"6"}
          spacing={"2rem"}
          bg={"white"}
          borderRadius={["none", "lg"]}
          boxShadow={"md"}
          maxW={["100%", "20em"]}
          minW={["100%", "20em"]}
        >
          <Box>
            <Heading fontWeight={"black"}>Idea Board</Heading>
            <Box h={"8px"} bgGradient="linear(to-r, #108dc7, #ef8e38)"></Box>
          </Box>

          {errorMessage.length > 0 && (
            <Alert borderRadius={"lg"} variant={"subtle"} status="error">
              <AlertIcon />
              <Stack direction={"column"} spacing={"0px"}>
                <AlertTitle>Login error!</AlertTitle>
                <AlertDescription>Check your email/password</AlertDescription>
              </Stack>
            </Alert>
          )}
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              value={email}
              onInput={(e: FormEvent<HTMLInputElement>) => {
                setEmail(e.currentTarget.value);
              }}
              type="email"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              value={password}
              type="password"
              onInput={(e: FormEvent<HTMLInputElement>) => {
                setPassword(e.currentTarget.value);
              }}
            />
          </FormControl>

          <Button onClick={signInAndRedirect}>Login</Button>
        </Stack>
      </Stack>
    </>
  );
}
