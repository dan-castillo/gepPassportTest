import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../shared/shared.service';

@Injectable({
    providedIn: 'root'
})

export class SefscreenService {
    constructor(
        private sharedService: SharedService,
        private http: HttpClient,
    ) { }
      GpSEF(Id: any): Observable<any> {
          let jwt_token = sessionStorage.getItem('JwtToken');
                                
 	 	return this.http.get(this.sharedService.WEB_API + `/systemEntryFeature/userdata/${Id}` + `?jwt_token=${jwt_token}`, undefined);}
                                getChartData(Id:any): Observable<any> {
                                    return this.http.get(this.sharedService.WEB_API + `/systemEntryFeature/chart/${Id}`);
      }

}