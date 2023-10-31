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
  const { register } = useForm();
  const { mutate: editTodo } = useEditTodo();
  const { mutate: deleteTask, isLoading } = useDeleteTodo({
    onSuccess: () => {
      client.invalidateQueries("todos");
    },
  });
  const handleSaveTodo = () => {};

  return (
    <li>
      <Flex justify="between" gap="3" align="center">
        <Flex align="center" gap="3">
          <Checkbox variant="soft" size="1" defaultChecked={completed} />
          <Text>{content}</Text>
        </Flex>
        <Flex gap="3">
          <Dialog.Root>
            <Dialog.Trigger>
              <Pencil2Icon color="gray" />
            </Dialog.Trigger>
            <Dialog.Content style={{ maxWidth: 450 }}>
              <EditModal
                register={register}
                content={content}
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
  content,
  register,
  submit,
}: {
  content: string;
  submit: () => void;
  register: UseFormRegister<FieldValues>;
}) => {
  return (
    <>
      <Dialog.Title>Edit task</Dialog.Title>

      <Flex direction="column" gap="3">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Task
          </Text>
          <Flex grow="1" width="100%" align="center" gap="2">
            <Checkbox
              {...register("completed")}
              variant="soft"
              size="3"
              defaultChecked
            />
            <TextField.Input
              {...register("content")}
              size="2"
              style={{ width: "100%" }}
              defaultValue={content}
              placeholder="Write your task here"
            />
          </Flex>
        </label>

        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Labels
          </Text>
          <Flex gap="2">
            <Badge color="orange">In progress</Badge>
            <Badge color="blue">In review</Badge>
            <Badge color="green">Complete</Badge>
          </Flex>
        </label>
      </Flex>

      <Flex gap="3" mt="4" justify="end">
        <Dialog.Close>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button>Save</Button>
        </Dialog.Close>
      </Flex>
    </>
  );
};
