/* eslint-disable react/no-unescaped-entities */
"use client";

import Spinner from "@/components/icons/Spinner";
import { useAuth, useCreateUser } from "@/services/user";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Flex,
  Text,
  Button,
  TextField,
  Container,
  Heading,
  Callout,
  ThemePanel,
} from "@radix-ui/themes";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function MyApp() {
  const { register, handleSubmit, getValues } = useForm();
  const { push } = useRouter();
  const {
    mutate,
    isError,
    error,
    isSuccess: createdUser,
    isLoading,
  } = useCreateUser();
  const { mutate: authUser, isSuccess: authSuccess } = useAuth();

  const onSubmit = async () => {
    const formValues = getValues();
    console.log("submit", formValues);

    mutate(formValues);
  };

  useEffect(() => {
    if (createdUser) {
      const { email, password } = getValues();
      authUser({ email, password });
    }
  }, [authUser, createdUser, getValues]);

  console.log("error :>> ", error);

  useEffect(() => {
    if (authSuccess) {
      push("/dashboard");
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
                Sign up
              </Heading>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Flex gap="3" direction="column">
                  <TextField.Input
                    required
                    {...register("first_name")}
                    size="2"
                    placeholder="First Name"
                  />
                  <TextField.Input
                    required
                    {...register("last_name")}
                    size="2"
                    placeholder="Last name"
                  />
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
                <Text size="2">Have an account?</Text>
                <Text size="2">
                  <Link href="/login">Sign in</Link>
                </Text>
              </Flex>
              {isError ? (
                <Callout.Root size="2">
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
