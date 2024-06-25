import { UserType } from "../types/types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/prisma.js";


const createJsonWebToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const getAllUsers = async () => {
  const allUsers = await prisma.user.findMany();
  return allUsers;
};

const getUserFromToken = async (token) => {
  try {
    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      return user;
    }

    return null;
  } catch (error) {
    return null;
  }
};

const loginUser = async (user: UserType) => {
  if (!user.email) throw new Error("Email is required");
  if (!user.password) throw new Error("Password is required");

  const existingUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (!existingUser) throw new Error("User does not exist");

  const passwordMatch = await bcrypt.compare(user.password, existingUser.password);

  if (!passwordMatch) throw new Error("Invalid password");

  const token = createJsonWebToken(existingUser.id)

  // @ts-ignore
  existingUser.token = token;

  return existingUser;
}

const signupUser = async (user: UserType) => {
  if (!user.email) throw new Error("Email is required");

  if (user.name.length < 3)
    throw new Error("Name must be at least 3 characters long");

  if (user.password.length < 6)
    throw new Error("Password must be at least 6 characters long");

  const emailExists = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (emailExists) throw new Error("An account with this email already exists");

  const nameExists = await prisma.user.findUnique({
    where: { name: user.name },
  });

  if (nameExists) throw new Error("An account with this name already exists");

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: hashedPassword,
    },
  });

  return newUser;
};

const deleteUser = async (id: string) => {
  return await prisma.user.delete({ where: { id } });
}

const getUserById = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } });
}

export { signupUser, getAllUsers , deleteUser, loginUser, getUserFromToken, getUserById};
