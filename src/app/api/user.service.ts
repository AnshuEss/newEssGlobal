import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  data:any;
  constructor(private httpClient: HttpClient) { }

  setData(data:any){
    return this.data;
  }
  getData(){
    return this.data;
  }
  
  stflogin(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'api.php?tag=clientLogin', data);
  }
}
