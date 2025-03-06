import bcrypt from "bcryptjs";
import { AppDataSource } from "../config/db";
import { User } from "../users/user.model";

const userRepository = AppDataSource.getRepository(User);

export const userService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
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

async function getById(id: number) {
  return await userRepository.findOne({ where: { id } }); // ✅ Ensures it returns a single user
}

async function create(params: any) {
  const user = userRepository.create(params);

  if (params.password) {
    // user.passwordHash = await bcrypt.hash(params.password, 10);
  }

  await userRepository.save(user);
  return user;
}

async function update(id: number, params: any) {
  const user = await getById(id);
  if (!user) throw "User not found";
  Object.assign(user, params);
  await userRepository.save(user);
}

async function _delete(id: number) {
  await userRepository.delete(id);
}
