import * as path from 'path';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
// import { Common } from '../config/Common';
// import * as st from 'stringtemplate-js';
import * as childProcess from 'child_process';

export class GCAMScreenSupportWorker {

    private exec = childProcess.exec;

    /**
     * 
     * @param screenname 
     * @param templatepath 
     * @param generationpath 
     * File Writing using Handlebars
     */

    public async gcamScreenSupportWorker(screenname, generationpath, templatepath, callback) {
        console.log('data from support', screenname, generationpath, templatepath);
        // let FilePath = path.resolve(__dirname, `${templatepath}/gcamresources.handlebars`);
        // console.log('test with type', typeof FilePath, FilePath);
        // return new Promise(async resolve => {
        //     await fs.readFile(FilePath, 'utf-8', (err, data) => {
        //         Handlebars.registerHelper("ifCond",function(v1,operator,v2,options) {
        //             switch (operator)
        //             {
        //                 case "==":
        //                     return (v1==v2)?options.fn(this):options.inverse(this);
                
        //                 case "!=":
        //                     return (v1!=v2)?options.fn(this):options.inverse(this);
                
        //                 case "===":
        //                     return (v1===v2)?options.fn(this):options.inverse(this);
                
        //                 case "!==":
        //                     return (v1!==v2)?options.fn(this):options.inverse(this);
                
        //                 case "&&":
        //                     return (v1&&v2)?options.fn(this):options.inverse(this);
                
        //                 case "||":
        //                     return (v1||v2)?options.fn(this):options.inverse(this);
                
        //                 case "<":
        //                     return (v1<v2)?options.fn(this):options.inverse(this);
                
        //                 case "<=":
        //                     return (v1<=v2)?options.fn(this):options.inverse(this);
                
        //                 case ">":
        //                     return (v1>v2)?options.fn(this):options.inverse(this);
                
        //                 case ">=":
        //                  return (v1>=v2)?options.fn(this):options.inverse(this);
                
        //                 default:
        //                     return eval(""+v1+operator+v2)?options.fn(this):options.inverse(this);
        //             }
        //         });
        //         const source = data;
        //         const template = Handlebars.compile(source);
        //         const result = template(screenname);
        //         // Common.createFolders(`${generationpath}/src/assets`);
        //         // fs.writeFile(`/resources.json`, result, (response) => {
        //         //     resolve(response);
        //         // })
        //         console.log(typeof result, JSON.stringify(result), result, typeof JSON.stringify(result), JSON.parse(result), typeof JSON.parse(result));
        //     });
        // });
        let roleArray:any[] = [];
        let resources_json = {
            "resource_name": `${screenname.resource_name}`,
            "resource_type": "screen",
            "roles":  `${screenname.roles}`,
            "components": [{
              "label_1425": {
                "id": "878979",
                "roles": [ "admin" ]
              },
              "textbox_6272": {
                "id": "135979",
                "roles": [ "admin" ]
              },
              "label_2437": {
                "id": "343979",
                "roles": [ "admin" ]
              },
              "dropdown_73821": {
                "id": "738291",
                "roles": [ "admin" ]
              }
            }]
        }

        console.log('check last json file format ', resources_json);
        callback(resources_json);
    }


}