import mongoose = require('mongoose');
import { Resourceschema } from '../model/resource';
import { CustomLogger } from '../config/Logger';
import { GCAMWorkerFile } from '../worker/GCAMScreenWorker';
const resourceschema = mongoose.model('resources', Resourceschema);

let gcamresources = new GCAMWorkerFile();


export class Gcamdao {
    public getResourceAuthorizationByRole(role: any,callback: { (response: any): void; (arg0: any): void; }) {
        new CustomLogger().showLogger('info', 'Enter into Gcamdao.ts:  getResourceAuthorizationByRole');
        console.log("DAO -------------->",role,"check a answer progress", { roles: { "$in" : [role.toLowerCase()]}})
         resourceschema.find({$or: [{roles: {$in: [role.toLowerCase()]}}]})
        .then( async(response: any) => {
            console.log("response",response);
              let res = await this.jsontransformation(response,role);
             console.log("res-----",res)
             new CustomLogger().showLogger('info', 'Exit from Gcamdao.ts: getResourceAuthorizationsByRole');
            callback(res);
        }).catch((error: any) => {
            callback(error);
        })
    }
    public async jsontransformation(response: any,role:string) {

        var data = JSON.stringify(response);
        let field = JSON.parse(data);

        let screen_json = {};
      
        screen_json[role] = {
            
            "type": "string",
            "screens": [],
             "value": {}
        }

        let test = [
            {
                "access": [
                     
                ]
            }
        ]
        field.forEach(async (element: { resource_type: string; resource_name: string; roles: any; components: any; }) => {
             console.log("screen_json -->",screen_json)
            let value = screen_json[role]["value"]
             console.log("value------->",value)
           let samp = screen_json[role]["screens"];
            if (element.resource_type === "screen") {
                let screen = { "screenname": element.resource_name }
                 console.log("eeee---->", element.resource_name);
                samp.push(screen);
                 console.log("screen----->",screen);
            }
            console.log("sara ---> ",element.components)
            let constructedComponents =  this. converter(element.components,role);
            value[element.resource_name] = [{
                "components": constructedComponents

            }]
        });
        
          test[0].access.push(screen_json);
         console.log("---> test --> ", test);
         return  test;
    }
    public  converter(components,role) {
        console.log("components",components);
        components.forEach(component => {
             for (var key in component) {
                if (component.hasOwnProperty(key)) {
                    console.log("-------------------------------> ",component[key])
                    if(component[key]["roles"].indexOf(role)>-1){
                        delete component[key]["roles"];
                        component[key]["value"] = "true";

                    }else {
                        delete component[key].roles;
                        component[key]["value"] = "false";

                    }
                    var val = component[key];
                    console.log(key, val);
                }
             }
        })
        console.log("--component --> >", components)
        return components;
       
    }

    public getallscreen(callback) {
        resourceschema.find().then((getscreen) => {
            callback(getscreen);
        }).catch(error => {
            callback(error);
        })
    }

    // public getByIdData(Id, callback) {
    //     resourceschema.findById(Id).populate({
    //         path: 'role', model: rolemodel
    //     }).then(result => {
    //         new CustomLogger().showLogger('info', 'Exit from SigninDao.ts: getbyiduserdao');
    //         callback(result);

    //     }).catch((error => {
    //         callback(error);
    //     }))
    // }
    
    public gcamgenerate(resources, callback) {
        new CustomLogger().showLogger('info', 'Enter into Gcamdao.ts:  getResourceAuthorizationGenerate');
        let generationpath = '../assets';
        let templatepath = '../../template';
        gcamresources.GcamScreenJson(resources, generationpath, templatepath, (response) => {
            console.log(typeof response, response, response.resource_name);
                // let userArray:any[] = [];
                // let valueroles = resources.roles
                // console.log(valueroles); 
                // resourceschema.find({resource_name: `${response.resource_name}`},
                //  {new: true}, (err, data) => {
                //      console.log('recheck data create', data);
                //     if (data === null){
                        let screenroute = new resourceschema(response);
                        console.log('data a save', screenroute);
                        screenroute.save();
                //     }
                // })
        });
    }

    public async GCAMDelete(GCAMId, callback) {
        new CustomLogger().showLogger(
          "info",
          "Enter into ItemTagsDao.ts: GCAMDelete"
        );
    
        resourceschema.findByIdAndRemove(GCAMId)
          .then((result) => {
            new CustomLogger().showLogger(
              "info",
              "Exit from ItemTagsDao.ts: GCAMDelete"
            );
    
            callback(result);
          })
          .catch((error) => {
            callback(error);
          });
    }

    public async gcamGetNounById(Id, callback) {
        new CustomLogger().showLogger(
          "info",
          "Enter into GcamDao.ts: GpGetNounById"
        );
    
        resourceschema.findById(Id)
          .then((result) => {
            new CustomLogger().showLogger(
              "info",
              "Exit from GcamDao.ts: GpGetNounById"
            );
    
            callback(result);
          })
          .catch((error) => {
            callback(error);
          });
    }
  
    public async GpUpdate(GcamUpdateData, callback) {
      new CustomLogger().showLogger(
        "info",
        "Enter into GcamupdateDao.ts: GpUpdate"
      );
  
      resourceschema.findOneAndUpdate({ _id: GcamUpdateData._id }, GcamUpdateData, {
        new: true,
      })
        .then((result) => {
          new CustomLogger().showLogger(
            "info",
            "Exit from GcamUpdateDao.ts: GpUpdate"
          );
  
          callback(result);
        })
        .catch((error) => {
          callback(error);
        });
    }

}
