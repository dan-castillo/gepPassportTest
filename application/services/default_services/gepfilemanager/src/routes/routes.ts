import { Request, Response, NextFunction } from "express";
import { AttachmentController } from "../controller/attachmentController";


export class Routes {
    private attach: AttachmentController = new AttachmentController();

    public routes(app): void {
        app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })

        //attachemnt routes
        app.route('/addAttachment').post(this.attach.addAttachment);
        app.route('/getattachment').post(this.attach.getAttachment);
        app.route('/deleteAttachment').delete(this.attach.deleteAttachment);
        app.route('/downloadAttachment').get(this.attach.downloadAttachment);
    }

}