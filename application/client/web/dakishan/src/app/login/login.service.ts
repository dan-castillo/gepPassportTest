import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SharedService } from '../../shared/shared.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  uploadImgFile(){
    return this.sharedService.UPLOAD_API  + '/addAttachment';
  }
  
  signup(user: any): Observable<any> {
    return this.http.post(this.sharedService.WEB_API + '/signup', user);
  }

  googlelogin(user: any): Observable<any> {
    return this.http.post(this.sharedService.WEB_API + '/googlesignin', user);
  }
  Login(): Observable<any> {
    return this.http.get(this.sharedService.WEB_API + '/auth/google');
  }

  Logout(user: any): Observable<any> {
    return this.http.put(this.sharedService.WEB_API + '/logout', user);
  }

  Consent(consent: any): Observable<any> {
    return this.http.put(this.sharedService.WEB_API + '/consent', consent);
  }

}
