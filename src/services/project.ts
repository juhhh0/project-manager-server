import prisma from "../../prisma/prisma.js";
import { ProjectType } from "../types/types.js";

const getProject = async (id: string) => {
    const project = await prisma.project.findUnique({
        where: { id },
    });
    return project;
}

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

  if (!project.title) throw new Error("Title is required");

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

const deleteProject = async (id: string) => {
    const project = await prisma.project.delete({
        where: { id },
    });
    return project;
}

const updateProject = async (id: string, project: ProjectType) => {
    const updatedProject = await prisma.project.update({
        where: { id },
        data: project,
    });
    return updatedProject;
}

export { getAllProjects, getUserProjects, createProject, deleteProject, getProject, updateProject };
