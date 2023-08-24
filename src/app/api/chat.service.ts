import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Message } from '../../message';
import { Socket } from 'ngx-socket-io';
import { Observable, Observer} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
 constructor(private httpClient: HttpClient,
  private socket: Socket
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

  sendMessage(message:any) {
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

  sendGroupMessage(message:any) {
    this.socket.emit('group-message', message);
  }

  getGroupMessages = () => {
    return  new Observable((observer: Observer<any>)=>{
      this.socket.on('group-message', (message:string)=>{
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
  groupTyping(obj:any){
    this.socket.emit('gtyping',obj);
  }
  
  getGroupTyping=()=>{
    return  new Observable((observer: Observer<any>)=>{
      this.socket.on('gtyping', (message:string)=>{
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
  

  getSupportMessages = () => {
    return  new Observable((observer: Observer<any>)=>{
      this.socket.on('support-message', (message:string)=>{
        //console.log("new-message",message);
        observer.next(message)
      })
    })
  }

  sendSupportMessage(message:any) {
    this.socket.emit('support-message', message);
  }
  saveSupportMsg(data:any){
    return this.httpClient.post(`${environment.chatUrl}/users/saveSupportMsg`,data);
  }

  creteGb(data:any){
    return this.httpClient.post(`${environment.chatUrl}/users/createGroup`,data);
  }

  getMyGroup(data:any){
    return this.httpClient.post(`${environment.chatUrl}/users/getMyGroup`,data);
  }

  getMyGropuDetail(data:any){
    return this.httpClient.post(`${environment.chatUrl}/users/getMyGropuDetail`,data);
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

  posts(data:any){
    return this.httpClient.post(`${environment.chatUrl}/posts/post`,data);
  }

  getAllPosts(){
    return this.httpClient.get(`${environment.chatUrl}/posts/getAllPosts`);
  }

  getAllmySupportMsg(data:any){
    return this.httpClient.post(`${environment.chatUrl}/users/getAllmySupportMsg`,data);
  }

  getAllSupportMsg(){
    return this.httpClient.get(`${environment.chatUrl}/users/getAllSupportMsg`);
  }

  countNoti(data:any){
    return this.httpClient.post(`${environment.chatUrl}/users/countNoti`,data);
  }
  readAllMsg(data:any){
    return this.httpClient.post(`${environment.chatUrl}/users/readAllMsg`,data);
  }

  saveComment(data:any){
    return this.httpClient.post(`${environment.chatUrl}/posts/saveComment`,data);
  }

  getMyGroupMess(data:any){
    return this.httpClient.post(`${environment.chatUrl}/users/getMyGroupMess`,data);
  }


  uploadCameraImg(data:any){
    return this.httpClient.post(`${environment.chatUrl}/users/uploadCameraImg`,data);
  }






}