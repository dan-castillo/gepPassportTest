import mongoose = require("mongoose");
import { attachmentSchema } from "../models/attachment";
import * as asyncLoop from "node-async-loop";
import { CustomLogger } from "../config/Logger";
const AWS = require('aws-sdk');
var path = require('path');
const fs = require('fs');
import { uuid, fromString } from 'uuidv4';

const attachmentModel = mongoose.model("Attachment", attachmentSchema);

export class AttachmentToS3Dao {

    private attachmentDetails: any;

    public fileUploadToS3( fileKey) {
        return new Promise((resolve, reject) => {
            new CustomLogger().showLogger("info", "Enter into attachmentToS3Dao.ts: fileUploadToS3");
            var { s3bucket, BUCKET_NAME } = this.configureAWSS3();
            s3bucket.createBucket(function () {
                var params = {
                    Bucket: BUCKET_NAME,
                    Key: fileKey,
                    //  Body: data,
                };
                s3bucket.upload(params, function (err, data) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    resolve(data);
                });
            });
            new CustomLogger().showLogger('info', 'Exit from attachmentToS3Dao.ts: fileUploadToS3');
        });

    }



    private configureAWSS3() {
        new CustomLogger().showLogger("info", "Enter into attachmentToS3Dao.ts: configureAWSS3");
        const BUCKET_NAME = process.env.BUCKET_NAME;
        const ACCESS_KEY = process.env.ACCESS_KEY;
        const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
        let s3bucket = new AWS.S3({ 
            accessKeyId: ACCESS_KEY,
            secretAccessKey: SECRET_ACCESS_KEY,
            Bucket: BUCKET_NAME,
        });
        new CustomLogger().showLogger('info', 'Exit from attachmentToS3Dao.ts: configureAWSS3');
        return { s3bucket, BUCKET_NAME };
    }

    public async deleteAttachment(fileKey) {
        new CustomLogger().showLogger("info", "Enter into attachmentToS3Dao.ts: deleteAttachment");
        var { s3bucket, BUCKET_NAME } = this.configureAWSS3();
        const params = {
            Bucket: BUCKET_NAME,
            Key: fileKey
        }
        console.log("params is :", params);
        s3bucket.createBucket({
            Bucket: BUCKET_NAME
        }, function () {
            console.log('before delete');
            s3bucket.deleteObject(params, function (err, data) {
                if (err) console.log(err);
                else
                    console.log("Successfully deleted file from bucket");
                console.log(data);
            });
        });

        new CustomLogger().showLogger('info', 'Exit from attachmentToS3Dao.ts: deleteAttachment');
    }

    public fileDownloadFromS3(fileKey, callback) {
        new CustomLogger().showLogger("info", "Enter into attachmentToS3Dao.ts: fileDownloadFromS3");
        var { s3bucket, BUCKET_NAME } = this.configureAWSS3();
        let uuid_str: string = fileKey.replace('task_attachments/', '');
        console.log("fileKey::", fileKey);
        console.log("uuid_str::", uuid_str);
        const params = {
            Bucket: BUCKET_NAME,
            Key: fileKey
        };
        console.log("params is :", params);
        s3bucket.getObject(params, (err, data) => {
            if (err) console.error(err);
            console.log("filename::", fileKey);
            const filePath = "./files/" + uuid_str;
            fs.writeFileSync(filePath, data.Body);
            console.log(`${filePath} has been created!`);
        });
        new CustomLogger().showLogger("info", "Exit into attachmentToS3Dao.ts: fileDownloadFromS3");
        callback();
    }


}
