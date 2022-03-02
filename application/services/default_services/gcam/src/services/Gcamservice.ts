import { CustomLogger } from '../config/Logger'
import { Gcamdao } from '../dao/Gcamdao';
// import { DmnWorkerFile } from '../worker/DMNWorker';
let gcamdao = new Gcamdao();
export class GcamService {
    constructor() { }
    public getResourceAuthorizationByRole( role,callback) {
        new CustomLogger().showLogger('info', 'Enter into Gcamservice.ts:  getResourceAuthorizationByRole');
        console.log("role--------------------> service ------->",role)
       gcamdao.getResourceAuthorizationByRole(role,(response) => {
        new CustomLogger().showLogger('info', 'Exit into Gcamservice.ts:  getResourceAuthorizationByRole'); 
            callback(response);
        });
    }

    public getallscreensservice(req: Request, callback) {
        gcamdao.getallscreen(response => {
            callback(response);
        });
    }

    // public getByIdDetails(req: Request, callback) {
    //    const userId = req.params.id;
    //    gcamdao.getByIdData(userId, (response) => {
    //        callback(response)
    //    })
    // }

    public GCAMgenerate(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into Gcamservice.ts:  getResourceAuthorizationGenerate');
        let json = req.body;
        gcamdao.gcamgenerate(json, (response) => {
            callback(response);
        })
    }

    public GCAMDelete(req: any, callback) {
        new CustomLogger().showLogger('info', 'Enter into Gcamservice.ts:  getResourceAuthorizationGenerate');
        let id = req.params.id;
        gcamdao.GCAMDelete(id, (response) => {
            callback(response);
        })
    }

    public gcamGetNounById(req: any, callback) {
        new CustomLogger().showLogger(
          "info",
          "Enter into gcamService.ts: GpGetNounById"
        );
        let Id = req.params.id;
        gcamdao.gcamGetNounById(Id, (response) => {
          new CustomLogger().showLogger(
            "info",
            "Exit from gcamService.ts: GpGetNounById"
          );
          callback(response);
        });
    }

    public gcamUpdate(req: Request, callback) {
        new CustomLogger().showLogger(
            "info",
            "Enter into gcamupdateserviceService.ts: GpUpdate"
        );
        let gcamUpdateData = req.body;
        gcamdao.GpUpdate(gcamUpdateData, (response) => {
            new CustomLogger().showLogger(
            "info",
            "Exit from gcamupdateService.ts: GpUpdate"
            );
            callback(response);
        });
    }
} 