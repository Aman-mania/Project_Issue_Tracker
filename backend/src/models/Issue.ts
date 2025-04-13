import mongoose, { Schema, Document } from 'mongoose';

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

export interface IIssue extends Document {
  title: string;
  description?: string;
  status: IssueStatus;
  priority: IssuePriority;
  project: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const IssueSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: {
      type: String,
      enum: Object.values(IssueStatus),
      default: IssueStatus.TODO,
    },
    priority: {
      type: String,
      enum: Object.values(IssuePriority),
      default: IssuePriority.MEDIUM,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IIssue>('Issue', IssueSchema);