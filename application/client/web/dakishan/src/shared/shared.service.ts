import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class SharedService {

     public WEB_API = environment.WEB_API;
     public UPLOAD_API = environment.UPLOAD_API;
    public MOBILE_API = environment.MOBILE_API;
}
  