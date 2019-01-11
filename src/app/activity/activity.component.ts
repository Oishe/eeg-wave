import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { RecorderService } from '../recorder/recorder.service';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})

export class ActivityComponent implements OnInit, OnDestroy {
  sub: Subscription;
  recording: boolean = true;
  startStopUnsubscribe: any;
  selectedActivity: number = 0;

  constructor(private recorderService:RecorderService, private data: DataService) { }

  ngOnInit() {
    this.startStopUnsubscribe = this.recorderService.startStop$.subscribe((res: any) => this.setRecording(res));
  }

  ngOnDestroy() {
    this.startStopUnsubscribe.unsubscribe();
  }

  setRecording(res:any){
    if(res.start){
      this.recording=false;
      if(this.selectedActivity==0){
        this.data.activity = "Simon";
      }
      else this.data.activity = "Music";
    }
    else this.recording = true;
  }

}
