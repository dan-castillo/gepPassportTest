import { Request, response } from 'express';
import { AttachmentToS3Dao } from '../dao/attachmentToS3Dao';
import { AttachmentToDBDao } from '../dao/attachmentToDBDao';
import { CustomLogger } from '../config/Logger';
import * as Busboy from 'busboy';
import { uuid, fromString } from 'uuidv4';
import { AttachmentToFileSystem } from '../dao/attachmentToFileSystem';

let attachmentToS3Dao = new AttachmentToS3Dao();
let attachmentToDBDao = new AttachmentToDBDao();
let attachmentToFileSystem = new AttachmentToFileSystem();
export class AttachmentService {
    public addAttachment(req, callback) {
        new CustomLogger().showLogger('info', 'Enter into attachmentService.ts: addAttachment');
        console.log("test--------------",req.body);
        var busboy = new Busboy({ headers: req.headers });
        const id = uuid();
        var fileKey;
        var s3URL;
        var fileName;
        busboy.on('file', async function (_fieldName, file, filename ) {
            console.log('inside busboy file',fileName,file);
            let resource = `${process.env.DB_RESOURCE}`;
            resource = 'FS';
            fileName=id+"_"+filename;
            //  file.on('data', async function (data) {
            //     console.log("data------------",data);
                if (resource === 'S3') {
                    console.log('inside busboy data');
                    fileKey = "task_attachments/" + fileName;
                    console.log("file key---", fileKey);
                    s3URL = "https://projectmonk.s3.amazonaws.com/" + fileKey;
                    let temp = await attachmentToS3Dao.fileUploadToS3(fileKey);
                }
                 else if (resource === 'FS') {
                    let files:any = await attachmentToFileSystem.fileSaveToSystem(file,fileName);
                    callback(files);
                 }
                // attachmentToDBDao.addAttachment("", dataObject, fileName, async (response: any) => {
                //     console.log("",dataObject);
                //     let resObject = {
                //         resp: response,
                //         originalFileData: originalFileData
                //     }
                //     new CustomLogger().showLogger('info', 'Exit from attachmentService.ts: addAttachment');
                //     callback(resObject);
                // });
            //  });
        });
        busboy.on('finish', function () {
            // attachmentToDBDao.addAttachment("", data, fileName, (response) => {
            //     new CustomLogger().showLogger('info', 'Exit from attachmentService.ts: addAttachment');
            //     callback(response);
            // });
        })
        req.pipe(busboy);
    }

    public deleteAttachment(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into attachmentService.ts: deleteAttachment')
        var fileKey = req.query.fileKey;
        let resource = `${process.env.DB_RESOURCE}`;
        console.log("Service fileKey is :", fileKey);
        if (resource === 'FS') {
        attachmentToFileSystem.deleteAttachment(req, (error) => {
            if(error==null){
                attachmentToDBDao.deleteAttachment(fileKey, (response) => {
                    new CustomLogger().showLogger('info', 'Exit from attachmentService.ts: deleteAttachment')
                    callback(response);
                });
            }
        });
        }
        else if (resource === 'S3') {
        attachmentToS3Dao.deleteAttachment(fileKey);
        attachmentToDBDao.deleteAttachment(fileKey, (response) => {
            new CustomLogger().showLogger('info', 'Exit from attachmentService.ts: deleteAttachment')
            callback(response);
        });
        }
    }
    public downloadAttachment(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into attachmentService.ts: downloadAttachment')
        var fileKey = req.query.fileKey;
        console.log("Service fileKey is :", fileKey);
        attachmentToS3Dao.fileDownloadFromS3(fileKey, (response) => {
            new CustomLogger().showLogger('info', 'Exit from attachmentService.ts: downloadAttachment')
            callback(response);
        });
    }

    public getAttachment(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into attachmentService.ts: getAttachment');
        console.log('req.body ', req.body);
        var fileIds = req.body;
        attachmentToDBDao.getAttachment(fileIds, (response) => {
            new CustomLogger().showLogger('info', 'Exit from attachmentService.ts: getAttachment');
            callback(response);
        });
    }

}
