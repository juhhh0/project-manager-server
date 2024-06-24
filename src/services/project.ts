import prisma from "../../prisma/prisma.js";
import { ProjectType } from "../types/types.js";

const getAllProjects = async () => {
  const allProjects = await prisma.project.findMany();
  return allProjects;
};

const getUserProjects = async (userId: string) => {
  console.log(userId, "userId");
  const userProjects = await prisma.project.findMany({
    where: { userId },
  });
  return userProjects;
};

const createProject = async (project: ProjectType, userId: string) => {
  const newProject = await prisma.project.create({
    data: {
      title: project.title,
      user: {
        connect: { id: userId },
      },
    },
  });
  return newProject;
};

export { getAllProjects, getUserProjects, createProject };
