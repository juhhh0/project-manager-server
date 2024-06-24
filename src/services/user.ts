import { PrismaClient } from "@prisma/client";
import { UserType } from "../types/types";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const getAllUsers = async () => {
  const allUsers = await prisma.user.findMany();
  return allUsers;
};

const addUser = async (user: UserType) => {

  if(!user.email) throw new Error("Email is required");

  if(user.name.length < 3) throw new Error("Name must be at least 3 characters long");

  if(user.password.length < 6) throw new Error("Password must be at least 6 characters long");

  const userExists = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (userExists) {
    throw new Error("An account with this email already exists");
  }

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

export { addUser, getAllUsers };
