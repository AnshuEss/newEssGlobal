import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/api/user-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  constructor(private userService:UserServiceService) { }

  ngOnInit() {}

}
