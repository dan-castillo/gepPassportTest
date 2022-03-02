import { GcamService } from '../services/Gcamservice';
import { Request, response, Response } from 'express';
import { CustomLogger } from '../config/Logger'
let GcamServices = new GcamService();

let gcam = new GcamService;

export class GcamController {
    public getResourceAuthorizationsByRole(req: Request, res: Response){
        new CustomLogger().showLogger('info', 'Enter into Gcamcontroller.ts: getResourceAuthorizationsByRole');
        console.log("getresources");
        const role = req.body.role ;
        console.log("in controller -------------------------->")
        gcam.getResourceAuthorizationByRole(role,(response)=> {
            console.log("response----->",response);
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from Gcamcontroller.ts: getResourceAuthorizationsByRole');
        });
    }

    public getallscreens(req: Request, res: Response) {
        let reqs:any = req; 
        gcam.getallscreensservice(reqs, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public gcamGetNounById(req: Request, res: Response) {
        gcam.gcamGetNounById(req, (response) => {
          new CustomLogger().showLogger(
            "info",
            "Enter into gcamController.ts: GpGetNounById"
          );
          res.status(200);
          res.json(response);
          new CustomLogger().showLogger(
            "info",
            "Exit from gcamController.ts: GpGetNounById"
          );
        });
      }

    public GCAMgenerate(req: Request, res: Response) {
        new CustomLogger().showLogger('info', 'Enter into Gcamcontroller.ts: getResourceAuthorizationsGenerate');
        let reqs:any = req; 
        gcam.GCAMgenerate(reqs, (response) => {
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from Gcamcontroller.ts: getResourceAuthorizationsGenerate');
        });
    }

    public GCAMDelete(req: Request, res: Response) {
        new CustomLogger().showLogger('info', 'Enter into Gcamcontroller.ts: getResourceAuthorizationsdeletebyid');
        let reqs:any = req; 
        gcam.GCAMDelete(reqs, (response) => {
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from Gcamcontroller.ts: getResourceAuthorizationsdeletebyid');
        });
    }

    public gcamUpdate(req: Request, res: Response) {
        let reqs:any = req; 
        GcamServices.gcamUpdate(reqs, (response) => {
            new CustomLogger().showLogger(
              "info",
              "Enter into gcamUpdateController.ts: GpUpdate"
            );
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger(
              "info",
              "Exit from gcamUpdateController.ts: GpUpdate"
            );
          });
    }



}

    