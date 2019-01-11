import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DataService {

  public startTime: any;
  public activityStartTime: any;
  public activityStopTime: any;
  public stopTime: any;
  public activity: any;

  public user: string;
  public time: any;
  public score: number;
  public sessionID: any;
  public gameNumber: number;
  public timeScoreID: number;
  
  //user (initials)
  //Object { time: date score: number}
  //sessionID --> call function in file upload service
  //gamenumber
  //timescoreID for object (increment in loop)

  outputData(){
    console.log(this.activity, this.startTime, this.activityStartTime, this.activityStopTime, this.stopTime);
  }

}
