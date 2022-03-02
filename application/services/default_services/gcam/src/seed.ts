import mongoose = require('mongoose');
import { Resourceschema } from './model/resource';
 import { resource_types } from './assets/resources';
 import { resourcetypes } from './assets/screen';
import { Screenschema } from './model/screen';

const resourcemodel = mongoose.model('Resource', Resourceschema);
const screenmodel = mongoose.model('screen', Screenschema);

export class SeedService {

    constructor() { }

    public create(): void {
        resource_types.map(something =>{
            console.log('enter into seed resurce name', something);
             resourcemodel.findOneAndUpdate({resource_name: something['resource_name']},
             something, {new: true}, (err, data)=>{
                 console.log('recheck data create', data);
                     if (data === null){
                    let screenroute = new resourcemodel(something);
                    console.log('data a save', screenroute);
                    screenroute.save();
                 }
            })
         })
    }
    public post(): void {
        resourcetypes.map(something =>{
            console.log('enter into seed resurce name', something);
             screenmodel.findOneAndUpdate({resources: something['resources']},
              something, {new: true}, (err, data)=>{
                      if (data === null){
                          console.log('recheck data post', data);
                    let screenroute = new screenmodel(something);
                    console.log('data a save', screenroute);
                    screenroute.save();
                  }
            })
         })
    }
   
 }

   
 

