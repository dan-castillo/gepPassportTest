import { GCAMScreenSupportWorker } from '../Supportworker/GCAMScreenSupportWorker';
let gcamscreensupport = new GCAMScreenSupportWorker();
export class GCAMWorkerFile {

    private screenarray:any;
    private screenarr = [];

    public GcamScreenJson(screens, generationpath, templatepath, callback) {
            if(screens.resource_name !== 'admin' && screens.resource_name !== 'authorization' 
            && screens.resource_name !== 'manageroles' && screens.resource_name !== 'home' 
            && screens.resource_name !== 'manageusers' && screens.resource_name !== 'sefscreen' && screens.resource_name !== 'login'
            && screens.resource_name !== 'logout' && screens.resource_name !== 'managecontrol'){
                delete screens['created_date']
                delete screens['created_by']
                delete screens['last_modified_by']
                delete screens['last_modified_date']
              
                this.screenarray = screens;
            }
        gcamscreensupport.gcamScreenSupportWorker(this.screenarray, generationpath, templatepath, (response) => {
            callback(response);
        })


    }
}