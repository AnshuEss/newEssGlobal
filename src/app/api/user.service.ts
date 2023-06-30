import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  data:any;
  constructor() { }

  setData(data:any){
    return this.data;
  }
  getData(){
    return this.data;
  }
}
