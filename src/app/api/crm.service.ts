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
}
