export enum IssueStatus {
  TODO = 'To Do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

export enum IssuePriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export interface Project {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Issue {
  _id: string;
  title: string;
  description?: string;
  status: IssueStatus;
  priority: IssuePriority;
  project: string;
  createdAt: string;
  updatedAt: string;
}