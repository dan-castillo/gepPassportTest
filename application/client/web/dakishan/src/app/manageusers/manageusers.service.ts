import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  constructor(
    private sharedService: SharedService,
    private http: HttpClient) { }

  GpGetAllRoles(): Observable<any> {
    return this.http.get(this.sharedService.WEB_API + '/getallroles');
  }

  GpGetAllUsers(): Observable<any> {
    return this.http.get(this.sharedService.WEB_API + '/getallusers');
  }

  GpUpdateUsers(payload:any): Observable<any> {
    return this.http.put(this.sharedService.WEB_API + '/updateuser', payload);
  }

}
