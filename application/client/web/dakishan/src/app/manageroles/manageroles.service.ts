import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ManageRolesService {

  constructor(private http: HttpClient,
    private sharedService: SharedService) { }

  GpGetAllRoles(): Observable<any> {
    return this.http.get(this.sharedService.WEB_API + '/getallroles');
  }

  GpSaveRoles(payload:any): Observable<any> {
    return this.http.post(this.sharedService.WEB_API + '/saveroles', payload);
  }

  GpDeleteRoles(id:any): Observable<any> {
    return this.http.delete(this.sharedService.WEB_API + '/deleteroles/' + id);
  }
}