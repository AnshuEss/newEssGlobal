import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrmService {
  constructor(private httpClient: HttpClient) { }

  studentLogin(data: any) {
    return this.httpClient.post(`${environment.crmUrl}` + 'api.php?tag=login', data);
  }
  updateToken(data: any) {
    return this.httpClient.post(`${environment.crmUrl}` + 'api.php?tag=updateToken', data);
  }

  getCBUSdata(data: any) { //get country branch univercity student
    return this.httpClient.post(`${environment.crmUrl}` + 'api.php?tag=getCBUSdata',data);
  }

  getBranchStu(data:any){
    return this.httpClient.post(`${environment.crmUrl}` + 'api.php?tag=getBranchStu',data);
  }

  checkFileNo(data: any) {
    return this.httpClient.post(`${environment.crmUrl}` + 'api.php?tag=checkFileNo', data);
  }

  sendPush(data: any) {
    return this.httpClient.post(`${environment.crmUrl}` + 'api.php?tag=sendPush', data);
  }

  timeline(data: any){
    return this.httpClient.post(`${environment.crmUrl}` + 'api.php?tag=timeline', data);
  }

  addServices(data: any) {
    return this.httpClient.post(`${environment.crmUrl}` + 'api.php?tag=addServices', data);
  }


}
