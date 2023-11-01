import { Button, AlertDialog, Flex, Text, TextField } from "@radix-ui/themes";
import "./SideMenu.styles.scss";
import { useCreateTodo } from "@/services/todo";
import { useForm } from "react-hook-form";
import { useUserData } from "@/hooks/user";
import { useQueryClient } from "react-query";
import { useState } from "react";
import Spinner from "../icons/Spinner";

// Think about the componentization i did
// Think about if i am using the next js features or not

export default function SideMenu() {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    userQuery: { data: user },
  } = useUserData();
  const client = useQueryClient();
  const { register, getValues, reset } = useForm();
  const { mutate, isLoading: creatingTodoLoading } = useCreateTodo({
    onSuccess: () => {
      client.invalidateQueries("todos");
      setModalOpen(false);
      reset();
    },
  });

  const handleCreateTodo = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { content } = getValues();

    mutate({
      content,
      labels: [],
      user_id: user?.user_id,
    } as any);
  };

  return (
    <Flex
      py="4"
      px="8"
      direction="column"
      grow="1"
      gap="3"
      className="sideMenu"
    >
      <AlertDialog.Root open={modalOpen}>
        <AlertDialog.Trigger>
          <Button onClick={() => setModalOpen(true)}>New Task</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <ModalContent
            isLoading={creatingTodoLoading}
            setModalOpen={setModalOpen}
            handleSubmit={handleCreateTodo}
            register={register}
          />
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Flex>
  );
}

const ModalContent = ({
  isLoading,
  handleSubmit,
  register,
  setModalOpen,
}: {
  handleSubmit: (e: React.SyntheticEvent) => Promise<void>;
  register: any;
  setModalOpen: any;
  isLoading: boolean;
}) => {
  return (
    <>
      <AlertDialog.Title>Create new rask</AlertDialog.Title>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Task
            </Text>
            <TextField.Input
              required
              {...register("content")}
              defaultValue={""}
              placeholder="Write your task here"
            />
          </label>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button
                onClick={() => setModalOpen(false)}
                variant="soft"
                color="gray"
              >
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <Button disabled={isLoading}>
              {isLoading ? <Spinner color="white" /> : "Save"}
            </Button>
          </Flex>
        </Flex>
      </form>
    </>
  );
};
