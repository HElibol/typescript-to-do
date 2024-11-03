import mongoose, {Schema, Document} from "mongoose";

export interface ITask extends Document{
    title: string;
    complated?: boolean;
    user: string;
}

const TaskSchema: Schema = new Schema({
    title: {
      type: String,
      required: true,
      unique: false
    },
    complated: {
      type: Boolean,
      default: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
});
  
const TaskModel = mongoose.model<ITask>('Task', TaskSchema);

export default TaskModel;