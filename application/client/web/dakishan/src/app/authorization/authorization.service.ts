import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../shared/shared.service';

@Injectable({
    providedIn: 'root'
})

export class AuthorizationService {
    constructor(
        private sharedService: SharedService,
        private http: HttpClient,
    ) { }

    GpCreate(resources:any): Observable<any> {
        let jwt_token = sessionStorage.getItem('JwtToken');
        console.log('rowdata from data', resources);
        return this.http.post(this.sharedService.WEB_API + '/gcamgenerate' + `?jwt_token=${jwt_token}`, resources);
    }

    GpGetAllValues(): Observable<any> {
        return this.http.get(this.sharedService.WEB_API + '/gcamallscreens');
    }

    GpGetNounById(tagsId:any): Observable<any> {
        return this.http.get(this.sharedService.WEB_API + '/gcambyid/' + tagsId);
    }

    GpUpdate(gcamData:any): Observable<any> {
        console.log(gcamData);
        return this.http.put(this.sharedService.WEB_API + '/gcamupdate', gcamData);
    }

    GpDelete(Id:any): Observable<any> {
        console.log('delete a item', Id);
        return this.http.delete(this.sharedService.WEB_API + '/gcamdeletebyid/' + Id);
    }
}
