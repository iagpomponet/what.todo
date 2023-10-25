import CreateUserUseCase from "./createUserUseCase";
import bcrypt from "bcryptjs";
import { createUser } from "../../../../database/db.js";

jest.mock("bcryptjs", () => ({
  hash: jest.fn().mockResolvedValue("hashedPassword"),
}));

jest.mock("../../../../database/db.js", () => ({
  createUser: jest.fn().mockResolvedValue({ id: 1 }),
}));

describe("CreateUserUseCase", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user with a valid input", async () => {
    const useCase = new CreateUserUseCase();
    const user = {
      first_name: "Iago",
      last_name: "Doe",
      email: "iago@email.com",
      password: "123",
      avatar_url: "",
    };

    const result = await useCase.execute(user);

    expect(result).toEqual({ id: 1 });
    expect(bcrypt.hash).toHaveBeenCalledWith("123", 10);
    expect(createUser).toBeCalledWith({ ...user, password: "hashedPassword" });
  });

  it("handle database insertion error", async () => {
    const useCase = new CreateUserUseCase();
    bcrypt.hash.mockClear();
    createUser.mockRejectedValue(new Error("Database Error"));

    const user = {
      first_name: "Iago",
      last_name: "Doe",
      email: "iago@email.com",
      password: "123",
      avatar_url: "",
    };

    await expect(useCase.execute(user)).rejects.toThrow(
      "Error: Database Error"
    );
  });

  it("should handle bcrypt hashing error", async () => {
    const useCase = new CreateUserUseCase();
    bcrypt.hash.mockClear();
    bcrypt.hash.mockRejectedValue(new Error("Hashing Error"));

    const user = {
      first_name: "Iago",
      last_name: "Doe",
      email: "iago@email.com",
      password: "123",
      avatar_url: "",
    };

    await expect(useCase.execute(user)).rejects.toThrow("Hashing Error");
    bcrypt.hash.mockRestore();
  });
});
