import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', ProjectSchema);