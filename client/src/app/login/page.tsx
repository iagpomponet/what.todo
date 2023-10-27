/* eslint-disable react/no-unescaped-entities */
"use client";

import Spinner from "@/components/icons/Spinner";
import { useAuth } from "@/services/user";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Flex,
  Text,
  Button,
  TextField,
  Container,
  Heading,
  Link as RadixLink,
  Callout,
} from "@radix-ui/themes";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function MyApp() {
  const { register, handleSubmit, getValues } = useForm();
  const { push } = useRouter();
  const {
    mutate: authUser,
    isSuccess: authSuccess,
    isLoading,
    isError,
    error,
  } = useAuth();

  const onSubmit = async () => {
    const { email, password } = getValues();

    authUser({ email, password });
  };

  useEffect(() => {
    if (authSuccess) {
      push("/");
    }
  }, [authSuccess, push]);

  return (
    <div className="app-container">
      {/* <ThemePanel /> */}
      <Container>
        <Flex
          width="100%"
          align="center"
          justify="center"
          height="100%"
          gap="9"
        >
          <Flex
            direction="column"
            gap="9"
            width="100%"
            justify="center"
            align="center"
          >
            <Flex direction="column" justify="end">
              <Heading mb="2" size="9">
                What todo
              </Heading>
              <Text>Organizing your day activity with Todo Daily</Text>
            </Flex>
            <Flex
              gap="3"
              direction="column"
              style={{ width: "100%", maxWidth: 400 }}
            >
              <Heading mb="2" size="4">
                Sign in
              </Heading>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Flex gap="3" direction="column">
                  <TextField.Input
                    required
                    {...register("email")}
                    size="2"
                    placeholder="E-mail"
                  />
                  <TextField.Input
                    required
                    {...register("password")}
                    size="2"
                    type="password"
                    placeholder="Password"
                  />
                  <Button disabled={isLoading} variant="solid">
                    {isLoading ? <Spinner /> : "Register"}
                  </Button>
                </Flex>
              </form>
              <Flex align="center" gap="1">
                <Text size="2">Don't Have an account yet?</Text>
                <Text size="2">
                  <Link href="/signup">Sign up</Link>
                </Text>
              </Flex>
              {isError ? (
                <Callout.Root size="1">
                  <Callout.Icon>{/* <InfoCircledIcon /> */}</Callout.Icon>
                  <Callout.Text>
                    {(error as any).response?.data?.error}
                  </Callout.Text>
                </Callout.Root>
              ) : null}
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </div>
  );
}
