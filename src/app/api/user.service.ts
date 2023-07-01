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
  contact(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'api.php?tag=contact', data);
  }


  getQuestion(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'api.php?tag=question', data);
  }


  subAns(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'api.php?tag=subAns', data);
  }

  addQuestion(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'api.php?tag=addQus', data);
  }

  UploadPdf(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'api.php?tag=uploadPdf', data);
  }

  getPdf() {
    return this.httpClient.get(`${environment.apiUrl}` + 'api.php?tag=getPdf');
  }

  addVideo(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'api.php?tag=addVideoLink', data);
  }

  getVideoLink() {
    return this.httpClient.get(`${environment.apiUrl}` + 'api.php?tag=getVideoLink');
  }


  clientLogin(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'api.php?tag=clientLogin', data);
  }

  addAudio(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'api.php?tag=audio', data);
  }

  getAudio() {
    return this.httpClient.get(`${environment.apiUrl}` + 'api.php?tag=getAudio');
  }


  releaseQus(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'api.php?tag=releaseQus', data);
  }

  getRelQues() {
    return this.httpClient.get(`${environment.apiUrl}` + 'api.php?tag=getRelQues');
  }

  chktestPaper(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'api.php?tag=chkpaper', data);
  }

  getStudentAns(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'api.php?tag=getStudentAns', data);
  }



  UploadBanner(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'api.php?tag=uploadBanner', data);
  }

  getBanner() {
    return this.httpClient.get(`${environment.apiUrl}` + 'api.php?tag=getBanner');
  }


  getActiveBanner() {
    return this.httpClient.get(`${environment.apiUrl}` + 'api.php?tag=getActiveBanner');
  }

  UpdateBanner(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'api.php?tag=UpdateBanner', data);
  }



  addNews(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'api.php?tag=addNews', data);
  }

  getNews() {
    return this.httpClient.get(`${environment.apiUrl}` + 'api.php?tag=getNews');
  }

  UpdateNews(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'api.php?tag=UpdateNews', data);
  }

  addLink(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'api.php?tag=addLink', data);
  }

  addAttendance(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'api.php?tag=addAttendance', data);
  }

  getAttendanceList() {
    return this.httpClient.get(`${environment.apiUrl}` + 'api.php?tag=getAttendanceList');
  }

  getAttendanceListByDate(data:any){
    return this.httpClient.post(`${environment.apiUrl}` + 'service.php?tag=getAttendanceListByDate',data);
  }

  updateAttendance(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'api.php?tag=updateAttendance', data);
  }

  getMeetingLink(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'api.php?tag=getMeetingLink', data);
  }


  getMymeetingLink(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'api.php?tag=getMymeetingLink', data);
  }

  addServices(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'service.php?tag=addServices', data);
  }

  removelink(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'service.php?tag=removelink', data);
  }

  createNewBranch(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'service.php?tag=createNewBranch', data);
  }

  getMycreatedBranch(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'service.php?tag=getMycreatedBranch', data);
  }

  moveUserInNewBranch(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'service.php?tag=moveUserInNewBranch', data);
  }

  getMyBatchStudent(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'service.php?tag=getMyBatchStudent', data);
  }


  checkUserCreateBrnchOrNot(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'service.php?tag=checkUserCreateBrnchOrNot', data);
  }

  addStudentOnMyBatch(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'service.php?tag=addStudentOnMyBatch', data);
  }//removeBatchUser

  removeBatchUser(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'service.php?tag=removeBatchUser', data);
  }

  addStudentLink(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'service.php?tag=addStudentLink', data);
  }

  getStudentScoreById(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'student.php?tag=getStudentScoreById', data);
  }
  //getAbsentList createTopic

  getAbsentList() {
    return this.httpClient.get(`${environment.apiUrl}` + 'student.php?tag=getAbsentList');
  }

  createTopic(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'question.php?tag=createTopic', data);
  }

  getTopicList(data:any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'question.php?tag=getTopicList',data);
  }

  addTopicStudent(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'question.php?tag=addTopicStudent', data);
  }  //getTopcStu updateStu

  getTopcStu(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'question.php?tag=getTopcStu', data);
  }

  updateStu(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'question.php?tag=updateStu', data);
  } //getQuesByTopicId


  getQuesByTopicId(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'question.php?tag=getQuesByTopicId', data);
  } //getStuTopic  updateBatchName

  getStuTopic(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'question.php?tag=getStuTopic', data);
  }


  releaseTopic(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'question.php?tag=releaseTopic', data);
  }


  updateBatchName(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'service.php?tag=updateBatchName', data);
  }


  getAns(data: any) {
    return this.httpClient.post(`${environment.apiUrl}` + 'question.php?tag=getAns', data);
  }

  addStudentScore(data: any){
    return this.httpClient.post(`${environment.apiUrl}` + 'student.php?tag=addStudentScore', data);
  }

  chktodayTestPaper(data: any){
    return this.httpClient.post(`${environment.apiUrl}` + 'student.php?tag=chktodayTestPaper', data);
  }

  getStudentScore() {
    return this.httpClient.get(`${environment.apiUrl}` + 'student.php?tag=getStudentScore');
  }

  removeTopicStudent(data: any){
      return this.httpClient.post(`${environment.apiUrl}` + 'student.php?tag=removeTopicStudent', data);
  }

  //getAbsentListByTeacherId

  getAbsentListByTeacherId(data: any){
    return this.httpClient.post(`${environment.apiUrl}` + 'service.php?tag=getAbsentListByTeacherId',data);
  }

  getStudentScoreByTeacherId(data: any){
    return this.httpClient.post(`${environment.apiUrl}` + 'student.php?tag=getStudentScoreByTeacherId',data);
  }

  updateQuestion(data: any){
    return this.httpClient.post(`${environment.apiUrl}` + 'question.php?tag=updateQuestion',data);
  }

  getTestPaperNoti(data: any){
    return this.httpClient.post(`${environment.apiUrl}` + 'question.php?tag=getTestPaperNoti',data);
  }

  updatetestPaperNoti(data:any){
    return this.httpClient.post(`${environment.apiUrl}` + 'question.php?tag=updatetestPaperNoti',data);
  }

  getQuesByTecherTopicId(data:any){
    return this.httpClient.post(`${environment.apiUrl}` + 'question.php?tag=getQuesByTecherTopicId', data);
  }

}
