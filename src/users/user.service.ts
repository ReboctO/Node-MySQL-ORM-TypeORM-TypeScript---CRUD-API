import bcrypt from "bcryptjs";
import { AppDataSource } from "../config/db";
import { User } from "../users/user.model";

// Define CreateUserDto interface for user creation
interface CreateUserDto {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string; // Include password field in the DTO
  role: string;
}

const userRepository = AppDataSource.getRepository(User);

export const userService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll(): Promise<User[]> {
  return await userRepository.find({
    select: [
      "id",
      "title",
      "firstName",
      "lastName",
      "email",
      "role",
      "passwordHash",
    ],
  });
}

async function getById(id: number): Promise<User | null> {
  return await userRepository.findOne({ where: { id } });
}

async function create(params: CreateUserDto) {
  // Use the CreateUserDto interface
  const user = userRepository.create({
    title: params.title,
    firstName: params.firstName,
    lastName: params.lastName,
    email: params.email,
    role: params.role,
  });

  // Hash the password if it's saprovided
  if (params.password) {
    user.passwordHash = await bcrypt.hash(params.password, 10);
  }

  await userRepository.save(user);
  return user;
}

async function update(id: number, params: Partial<User>) {
  const user = await getById(id);
  if (!user) throw "User not found";
  Object.assign(user, params);
  await userRepository.save(user);
}

async function _delete(id: number) {
  await userRepository.delete(id);
}
