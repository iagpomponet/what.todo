import { deleteUser } from "../../../../database/db.js";
import DeleteUserUserCase from "./deleteUserUseCase";

jest.mock("../../../../database/db.js", () => ({
  deleteUser: jest.fn().mockResolvedValue({ id: 1 }),
}));

describe("DeleteUserUseCase", () => {
  it("Should delete user", async () => {
    const id = "123";
    const useCase = new DeleteUserUserCase();

    await useCase.execute({ id });

    expect(deleteUser).toBeCalledWith("123");
  });

  it("Should handle Database error", async () => {
    const id = "123";
    const useCase = new DeleteUserUserCase();

    deleteUser.mockRejectedValue(new Error("DB Error"));

    await expect(useCase.execute({ id })).rejects.toThrow("DB Error");
  });
});
