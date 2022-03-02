import { GcamController } from '../controllers/Gcamcontroller';
export class Routes {

     public gcam: GcamController = new GcamController();

    public routes(app): void {

        app.route('/accesslevel').post(this.gcam.getResourceAuthorizationsByRole);
        app.route('/gcamallscreens').get(this.gcam.getallscreens);
        // app.route('/getbyid/:id').get(this.gcam.getById);
        app.route('/gcamgenerate').post(this.gcam.GCAMgenerate);
        app.route('/gcamdeletebyid/:id').delete(this.gcam.GCAMDelete);
        app.route('/gcambyid/:id').get(this.gcam.gcamGetNounById);
        app.route('/gcamupdate').put(this.gcam.gcamUpdate)
        
    }
}