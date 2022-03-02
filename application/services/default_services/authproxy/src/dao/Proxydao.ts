import mongoose = require('mongoose');
import * as jwt from 'jsonwebtoken';
import * as fetch from 'node-fetch';
import { Signinschema } from '../model/Signin';
import * as Constants from '../config/constants';
import { CustomLogger } from '../config/Logger';


const signinmodel = mongoose.model('Signin', Signinschema);

export class Proxydao {
   

     public async userdao(userdetails, callback) {
         new CustomLogger().showLogger('info', 'Enter into Proxydao.ts: userdao');

         var role = userdetails.role;
         console.log("role------",role);
         var posturl = `${Constants.gcamUrl}/accesslevel`
        // var posturl = "http://gepcustomauthorizationmanager-5746:8050"+"/accesslevel"
         console.log('posturl',posturl);
         console.log('role----------->',role);
        await fetch(posturl, { method: 'POST', body: JSON.stringify({"role": role.toLowerCase()}),
        headers: { 'Content-Type': 'application/json'  }})
          .then(res => res.json())
             .then((response) => {
                 console.log("response",response);
                 new CustomLogger().showLogger('info', 'Exit from Proxydao.ts: userdao');
                 callback(response);
             }).catch(error => {
                 callback(error);
             })
            }
    }



