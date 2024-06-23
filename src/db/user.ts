import { PrismaClient } from "@prisma/client";
import { UserType } from "../types/types";

const prisma = new PrismaClient();

const getAllUsers = async () => {
    const allUsers = await prisma.user.findMany();
    return allUsers;
    
}

const addUser = async (user : UserType) => {
  const newUser = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
    },
  });

  return newUser;
};

export { addUser, getAllUsers };
