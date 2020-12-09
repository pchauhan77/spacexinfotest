import { Component, OnInit } from '@angular/core';
import { appConstant } from 'src/app/constants/app.constant';
import { ApiCallService } from 'src/app/services/api-call.service';

@Component({
  selector: 'app-spacexlaunchinfo',
  templateUrl: './spacexlaunchinfo.component.html',
  styleUrls: ['./spacexlaunchinfo.component.css']
})
export class SpacexlaunchinfoComponent implements OnInit {
response:any=[];
launchUpdatedValue:any;
landUpdatedValue:any;
currentYear:any;
baseUrl: string = appConstant['baseUrl'];
  constructor(private service:ApiCallService) { }

  ngOnInit() {
    if(localStorage.getItem('year')===null && localStorage.getItem('launch')===null && localStorage.getItem('landing')===null){
      this.firstTime();
    }
    else{
      if(localStorage.getItem('year')!==null && localStorage.getItem('launch')!==null && localStorage.getItem('landing')!==null){
        this.ApplyAllFilter();
      }
      else {
        if(localStorage.getItem('launch')!==null){
          this.successfullLaunch();
        }
        else {
          if(localStorage.getItem('landing')!==null){
            this.successfullLanding();
          }
          else {
            if(localStorage.getItem('year')!==null){
              this.selectedYear();
            }
          }
        }
      }
    }
  }
  firstTime(){
    this.service.showLoader();
    let URL = this.baseUrl + "launches?limit=100";
    this.service.getRequest(URL).subscribe(value=>{
      this.response=value;
      this.service.hideLoader();
    })
  }
  ApplyAllFilter(){
    let launch=localStorage.getItem('launch');
    let landing=localStorage.getItem('landing');
    let year = localStorage.getItem('year')
    this.service.showLoader();
    let URL = this.baseUrl + `launches?limit=100&launch_success=${launch}&land_success=${landing}&launch_year=${year}`;
    this.service.getRequest(URL).subscribe(value=>{
      this.response=value;
      this.service.hideLoader();
    })
  }
  successfullLaunch(){
    let launch=localStorage.getItem('launch');
    this.service.showLoader();
    let URL = this.baseUrl + `launches?limit=100&launch_success=${launch}`;
    this.service.getRequest(URL).subscribe(value=>{
      this.response=value;
      this.service.hideLoader();
    })
  }

  successfullLanding(){
    let landing=localStorage.getItem('landing');
    this.service.showLoader();
    let URL = this.baseUrl + `launches?limit=100&land_success=${landing}`;
    this.service.getRequest(URL).subscribe(value=>{
      this.response=value;
      this.service.hideLoader();
    })
  }

  selectedYear(){
    let year=localStorage.getItem('year');
    this.service.showLoader();
    let URL = this.baseUrl + `launches?limit=100&launch_year=${year}`;
    this.service.getRequest(URL).subscribe(value=>{
      this.response=value;
      this.service.hideLoader();
    })
  }
  updatedValue(event){
    this.launchUpdatedValue=event;
    this.successfullLaunch();
  }
  updatedLandingValue(event){
this.landUpdatedValue=event;
this.successfullLanding();
  }
  updatedYear(event){
this.currentYear=event;
this.selectedYear();
  }

}
