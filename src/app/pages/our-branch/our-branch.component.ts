import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-branch',
  templateUrl: './our-branch.component.html',
  styleUrls: ['./our-branch.component.scss'],
})
export class OurBranchComponent  implements OnInit {
  IndiaDiv:boolean=true;
  CanadaDiv:boolean=false;
  AusDiv:boolean=false;
  constructor() { }

  ngOnInit() {}

  viewCty(ctry:any){
    if(ctry=='india'){
      this.IndiaDiv=true;
      this.CanadaDiv=false;
      this.AusDiv=false;
    }else if(ctry=='canada'){
      this.IndiaDiv=false;
      this.CanadaDiv=true;
      this.AusDiv=false;
    }else if(ctry=='aus'){
      this.IndiaDiv=false;
      this.CanadaDiv=false;
      this.AusDiv=true;
    }
  }

}
