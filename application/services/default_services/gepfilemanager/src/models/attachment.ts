
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const attachmentSchema = new Schema({
   fileUrl: String,
   fileKey: String,
   fileData: Object,
   resource:String,
   createdOn: Date,
   updatedOn: Date
})

const attachmentModel = mongoose.model('attachment', attachmentSchema, 'attachment');
export default attachmentModel;
