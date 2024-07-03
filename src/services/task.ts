import prisma from "../../prisma/prisma.js";

export const deleteTask = async (id) => {
  const task = await prisma.task.delete({
    where: { id },
  });
  return task;
};

export const addTask = async (projectId: string, task: any) => {
  const newTask = await prisma.task.create({
    data: {
      title: task.title,
      content: task.content,
      project: {
        connect: { id: projectId },
      },
    },
  });
  return newTask;
};
