import { useDeleteTodo, useEditTodo } from "@/services/todo";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import {
  Checkbox,
  Dialog,
  Flex,
  Separator,
  Text,
  TextField,
  Badge,
  Button,
  AlertDialog,
} from "@radix-ui/themes";
import { FieldValues, UseFormRegister, useForm } from "react-hook-form";
import { UseMutateFunction, useQueryClient } from "react-query";
import Spinner from "../icons/Spinner";
import { useState } from "react";

interface TodoItemI {
  todo_id: string;
  content: string;
  labels?: any[];
  completed: boolean;
}

interface DeleteDialogI {
  deleteTask: UseMutateFunction<any, unknown, string, unknown>;
  todo_id: string;
  isLoading: boolean;
}

export default function TodoItem({ content, completed, todo_id }: TodoItemI) {
  const client = useQueryClient();
  const { register, getValues } = useForm();
  const [modalOpen, setModalOpen] = useState(false);

  const { mutate: editTodo, isLoading: editLoading } = useEditTodo({
    onSuccess: () => {
      client.invalidateQueries("todos");
      setModalOpen(false);
    },
  });

  const { mutate: deleteTask, isLoading } = useDeleteTodo({
    onSuccess: () => {
      client.invalidateQueries("todos");
    },
  });

  console.log("completed :>> ", completed);

  const handleSaveTodo = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { completed, content } = getValues();

    editTodo({ todo_id, payload: { completed, content } });
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <li>
      <Flex justify="between" gap="3" align="center">
        <Flex align="center" gap="3">
          <Checkbox variant="soft" size="1" defaultChecked={completed} />
          <Text>{content}</Text>
        </Flex>
        <Flex gap="3">
          <Dialog.Root open={modalOpen}>
            <Dialog.Trigger onClick={() => setModalOpen(true)}>
              <Pencil2Icon color="gray" />
            </Dialog.Trigger>
            <Dialog.Content style={{ maxWidth: 450 }}>
              <EditModal
                onClose={closeModal}
                isLoading={editLoading}
                register={register}
                data={{
                  completed,
                  content,
                }}
                submit={handleSaveTodo}
              />
            </Dialog.Content>
          </Dialog.Root>
          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <TrashIcon cursor="pointer" color="gray" />
            </AlertDialog.Trigger>
            <AlertDialog.Content style={{ maxWidth: 450 }}>
              <DeleteDialog
                isLoading={isLoading}
                todo_id={todo_id}
                deleteTask={deleteTask}
              />
            </AlertDialog.Content>
          </AlertDialog.Root>
        </Flex>
      </Flex>
      <Separator my="3" size="4" />
    </li>
  );
}

const DeleteDialog = ({ deleteTask, isLoading, todo_id }: DeleteDialogI) => {
  return (
    <>
      <AlertDialog.Title>Delete task</AlertDialog.Title>
      <AlertDialog.Description size="2">
        Are you sure? This action cannot be reverted
      </AlertDialog.Description>

      <Flex gap="3" mt="4" justify="end">
        <AlertDialog.Cancel>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </AlertDialog.Cancel>
        <AlertDialog.Action>
          <Button
            disabled={isLoading}
            onClick={() => deleteTask(todo_id)}
            variant="solid"
            color="red"
          >
            Delete
          </Button>
        </AlertDialog.Action>
      </Flex>
    </>
  );
};

const EditModal = ({
  data,
  register,
  submit,
  isLoading,
  onClose,
}: {
  data: {
    content: string;
    completed: boolean;
  };
  submit: (e: React.SyntheticEvent) => void;
  register: UseFormRegister<FieldValues>;
  isLoading: boolean;
  onClose: () => void;
}) => {
  console.log("data :>> ", data);
  return (
    <>
      <Dialog.Title>Edit task</Dialog.Title>

      <Flex direction="column" gap="3">
        <form onSubmit={submit}>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Task
            </Text>
            <Flex grow="1" width="100%" align="center" gap="2">
              <input type="checkbox" {...register("completed")} />
              <TextField.Input
                {...register("content")}
                size="2"
                style={{ width: "100%" }}
                defaultValue={data.content}
                placeholder="Write your task here"
              />
            </Flex>
          </label>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button onClick={onClose} variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Spinner /> : "Save"}
              </Button>
            </Dialog.Close>
          </Flex>
        </form>
      </Flex>
    </>
  );
};
