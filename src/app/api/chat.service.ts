import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Message } from '../../message';
import { Socket } from 'ngx-socket-io';
import { Observable, Observer} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
 constructor(private httpClient: HttpClient,
  //private socket: Socket
  ) {}
  data:any;
  setData(data:any){
    this.data=data;
  }

  getData(){
    return this.data;
  }

  addStudentOnMyChatList(data:any){
    return this.httpClient.post(`${environment.chatUrl}/users/addStudentOnMyChatList`,data);
  }

  getMytudentList(data:any){
    return this.httpClient.post(`${environment.chatUrl}/users/getMytudentList`,data);
  }

  saveMsg(data:any){
    return this.httpClient.post(`${environment.chatUrl}/users/saveMsg`,data);
  }

  getMyMsg(data:any){
    return this.httpClient.post(`${environment.chatUrl}/users/getMyMsg`,data);
  }

 /* sendMessage(message:any) {
    this.socket.emit('new-message', message);
  }
   getMessages = () => {
    return  new Observable((observer: Observer<any>)=>{
      this.socket.on('new-message', (message:string)=>{
        //console.log("new-message",message);
        observer.next(message)
      })
    })
  }

  getGroupMessages = () => {
    return  new Observable((observer: Observer<any>)=>{
      this.socket.on('group-message', (message:string)=>{
        console.log("group-message",message);
        observer.next(message)
      })
    })
  }

  typing(uid:any){
    this.socket.emit('typing',uid);
  }

  getTyping=()=>{
    return  new Observable((observer: Observer<any>)=>{
      this.socket.on('typing', (message:string)=>{
        observer.next(message)
      })
    })
  }

  getNotifyOnchatList=()=>{
    return  new Observable((observer: Observer<any>)=>{
      this.socket.on('notify', (message:string)=>{
        observer.next(message)
      })
    })
  }
  */

  creteGb(data:any){
    return this.httpClient.post(`${environment.chatUrl}/users/createGroup`,data);
  }

  getMyGroup(data:any){
    return this.httpClient.post(`${environment.chatUrl}/users/getMyGroup`,data);
  }

  
  addStudentOnGroup(data:any){
    return this.httpClient.post(`${environment.chatUrl}/users/addStudentOnGroup`,data);
  }

  saveGroupMsg(data:any){
    return this.httpClient.post(`${environment.chatUrl}/users/saveGroupMsg`,data);
  }


  delMessage(data:any){
    return this.httpClient.post(`${environment.chatUrl}/users/delMessage`,data);
  }

  redAllUnreadMsg(data:any){
    return this.httpClient.post(`${environment.chatUrl}/users/redAllUnreadMsg`,data);
  }

  UploadBanner(data:any){
    return this.httpClient.post(`${environment.chatUrl}/users/banner`,data);
  }

  getActiveBannerImg(){
    return this.httpClient.get(`${environment.chatUrl}/users/getActiveBannerImg`);
  }

  getAllBannerImg(){
    return this.httpClient.get(`${environment.chatUrl}/users/getAllBannerImg`);
  }

  activeDeactivebannerImg(data:any){
    return this.httpClient.post(`${environment.chatUrl}/users/activeDeactivebannerImg`,data);
  }



}