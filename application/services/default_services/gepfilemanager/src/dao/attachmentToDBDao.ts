import mongoose = require("mongoose");
import { attachmentSchema } from "../models/attachment";
import * as asyncLoop from "node-async-loop";
import { CustomLogger } from "../config/Logger";
const attachmentModel = mongoose.model("Attachment", attachmentSchema);

export class AttachmentToDBDao {
    private attachmentDetails: any;

    public addAttachment(url, data, fileKey, callback) {
        new CustomLogger().showLogger('info', 'Enter into attachmentToDBDao.ts: addAttachment');
        let resource=`${process.env.DB_RESOURCE}`;
        resource='FS';
        this.attachmentDetails = {
            fileKey: fileKey,
            fileData: data,
            fileUrl: url,
            resource:resource,
            createdOn: new Date()
        };
        console.log("attachmentDetails>>>>",this.attachmentDetails)
        let attachment = new attachmentModel(this.attachmentDetails);
        attachment.save().then((result) => {
            new CustomLogger().showLogger('info', 'Exit from attachmentToDBDao.ts: addAttachment');
            callback(result);
        }).catch((error) => {
            callback(error);
        });
    }

    public getAttachment(fileIds, callback) {
        new CustomLogger().showLogger('info', 'Enter into attachmentToDBDao.ts: getAttachment');
        attachmentModel.find().where('_id').in(fileIds).exec((err, filesArray) => {
            if(err) {
                new CustomLogger().showLogger('info', 'Exit from attachmentToDBDao.ts: getAttachment');
                callback(err)
            } else {
                new CustomLogger().showLogger('info', 'Exit from attachmentToDBDao.ts: getAttachment');
                callback(filesArray)
            }
        })
    }

    public deleteAttachment(fileKey, callback) {
        new CustomLogger().showLogger('info', 'Enter into attachmentToDBDao.ts: deleteAttachment')
        attachmentModel.deleteOne({s3FileKey: fileKey}).then((result) => {
            new CustomLogger().showLogger('info', 'Exit from attachmentToDBDao.ts: deleteAttachment');
            callback(result);
        }).catch((error) => {
            callback(error);
        });
    }
}