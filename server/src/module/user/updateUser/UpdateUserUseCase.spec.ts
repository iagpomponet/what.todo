import { updateUser } from "../../../database/db";
import UpdateUserUseCase from "./UpdateUserUseCase";

jest.mock("../../../../database/db", () => ({
  updateUser: jest.fn().mockResolvedValue({ id: 1 }),
}));

describe("UpdateUserUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update the user", async () => {
    const useCase = new UpdateUserUseCase();
    const user = {
      first_name: "Iago",
      last_name: "Doe",
      user_id: "1234",
    };

    const result = await useCase.execute(user);

    expect(updateUser).toBeCalledWith(user.user_id, {
      first_name: user.first_name,
      last_name: user.last_name,
    });
    expect(result).toEqual({ id: 1 });
  });

  it("should handle if database operation fails", async () => {
    const useCase = new UpdateUserUseCase();
    updateUser.mockRejectedValue(new Error("DB Error"));

    const user = {
      first_name: "Iago",
      last_name: "Doe",
      user_id: "1234",
    };

    await expect(useCase.execute(user)).reje.toThrow("DB Error");
  });
});
