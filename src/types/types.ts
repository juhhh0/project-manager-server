export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type ProjectType = {
  id: string;
  title: string;
  description: string;
  content: string;
  tasks: TaskType[];
  userId: string;
  githubUrl: string;
  hostingUrl: string;
};

type TaskType = {
  id: string;
  title: string;
  content: string;
};

