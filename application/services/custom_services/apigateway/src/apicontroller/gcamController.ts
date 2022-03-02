import * as express from 'express';
import { Request, Response } from 'express';
import * as Constant from '../config/Constant';
import { ApiAdapter }  from '../config/apiAdapter';
import Controller from '../interface/controller.interface';
import { CustomLogger } from '../config/Logger'

export class gcamController implements Controller {
      public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/accesslevel', this.gcam);
this.router.post('/gcamgenerate', this.gcamGenerate);
this.router.get('/gcamallscreens', this.gcamscreens);
this.router.delete('/gcamdeletebyid/:id', this.gcamdeletebyId);
this.router.get('/gcambyid/:id', this.gcamGetById);
this.router.put('/gcamupdate', this.gcamupdatebyId);
    }

public gcam(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into gcamController.ts: gcam');
        new ApiAdapter().post(Constant.GCAMURL + `${req.url}` , req.body)
        .then((res: any) => res.response.json()).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/web' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from gcamController.ts: gcam');
        }).catch(err => {
            res.send(err);
        });
    }
public gcamGenerate(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into gcamController.ts: gcamGenerate');
        new ApiAdapter().post(Constant.GCAMURL + `${req.url}` , req.body)
        .then((res: any) => res.response.json()).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/web' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from gcamController.ts: gcamGenerate');
        }).catch(err => {
            res.send(err);
        });
    }
public gcamscreens(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into gcamController.ts: gcamscreens');
        new ApiAdapter().get(Constant.GCAMURL + `${req.url}` )
        .then((res: any) => res.response.json()).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/web' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from gcamController.ts: gcamscreens');
        }).catch(err => {
            res.send(err);
        });
    }
public gcamdeletebyId(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into gcamController.ts: gcamdeletebyId');
        new ApiAdapter().delete(Constant.GCAMURL + `${req.url}` )
        .then((res: any) => res.response.json()).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/web' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from gcamController.ts: gcamdeletebyId');
        }).catch(err => {
            res.send(err);
        });
    }
public gcamGetById(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into gcamController.ts: gcamGetById');
        new ApiAdapter().get(Constant.GCAMURL + `${req.url}` )
        .then((res: any) => res.response.json()).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/web' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from gcamController.ts: gcamGetById');
        }).catch(err => {
            res.send(err);
        });
    }
public gcamupdatebyId(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into gcamController.ts: gcamupdatebyId');
        new ApiAdapter().put(Constant.GCAMURL + `${req.url}` , req.body)
        .then((res: any) => res.response.json()).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/web' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from gcamController.ts: gcamupdatebyId');
        }).catch(err => {
            res.send(err);
        });
    }








}

