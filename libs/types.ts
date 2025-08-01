// "/libs/types.ts"

interface SidebarProps {
  userName: string;
  type?: "admin" |"student"
}
export type { SidebarProps };

interface TaskCardProps {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
};
export type { TaskCardProps };

interface FooterProps  {
  year: string;
  fullName: string;
  studentId: string | number;
};
export type { FooterProps  };