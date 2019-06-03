import { Comment } from './comment.model';

export interface BugInfo {
  title: string;
  description?: string;
  priority?: number;
  reporter: string;
  createdAt?: string;
  status: string;
  id?: string;
  comments?: [Comment];
}
