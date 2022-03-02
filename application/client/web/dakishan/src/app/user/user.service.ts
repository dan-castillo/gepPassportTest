import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router, private sharedService: SharedService) { }


  Getuser(userid: any): Observable<any> {
    return this.http.get(this.sharedService.WEB_API + `/getuser/${userid}`);
  }

  Getroles(): Observable<any> {
    return this.http.get(this.sharedService.WEB_API + '/getallroles');
  }

  Updateuser(userobject: any): Observable<any> {
    return this.http.put(this.sharedService.WEB_API + '/updateuser/', userobject);
  }
  deleteUser(id: any): Observable<any> {
    return this.http.delete(this.sharedService.WEB_API + '/deleteuser/' + id);
  }

  UpdateUserImg(userobject: any): Observable<any> {
    return this.http.put(this.sharedService.WEB_API + '/updateuserimg', userobject);
  }
}
