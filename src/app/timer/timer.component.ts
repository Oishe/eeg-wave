import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

// refer here for documentation on simple timer: https://dmkcode.com/2016/08/simple-timer-using-angular-2-and-rxjs/
// https://dmkcode.com/2016/09/simple-timer-using-angular-2-and-rxjs-part-2/

import { TimerService } from './timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})

export class TimerComponent implements OnInit, OnDestroy {
  private playStopUnsubscribe: any;

  start = 0;
  ticks = 0;

  minutesDisplay: number = 0;
  hoursDisplay: number = 0;
  secondsDisplay: number = 0;

  sub: Subscription;

  buffer_1: number = 30;
  buffer_2: number = 60;
  activity_1: number = 180;
  activity_2: number = 300;
  activity_3: number = 600;

  bufferTime: number = this.buffer_1;
  activityTime: number = this.activity_1;
  totalTime: number;
  disable: boolean = false;

  startTime: any;
  activityStartTime: any;
  activityEndTime: any;
  endTime: any;

  constructor(private timerService: TimerService) { }

  ngOnInit() {
    this.playStopUnsubscribe = this.timerService.playStop$.subscribe((res: any) => this.playStop(res));
  }

  ngOnDestroy() {
    this.playStopUnsubscribe.unsubscribe();;
  }

  private playStop(res: any) {
    if(res.play) {
        this.startTimer();
    } else if (res.stop) {
        this.stopTimer();
    }
  }

  private startTimer() {
    this.disable=true;
    this.totalTime = this.bufferTime*2 + this.activityTime;
    this.startTime = Date.now()+1;
    const timer = interval(1000);
    this.sub = timer.subscribe(
      t => {
        this.ticks = this.start + t;

        if(this.ticks==this.totalTime){
          this.stopTimer();
          this.timerService.stopTimer();
        }
        if(this.ticks==this.bufferTime){
          this.activityStartTime = Date.now();
        }
        if(this.ticks==this.bufferTime + this.activityTime){
          this.activityEndTime = Date.now();
        }
        else{
          this.secondsDisplay = this.getSeconds(this.ticks);
          this.minutesDisplay = this.getMinutes(this.ticks);
          this.hoursDisplay = this.getHours(this.ticks);
        }
      }
    );
  }

  private stopTimer() {
    this.endTime = Date.now();
    this.disable = false;

    this.start = 0;
    this.ticks = 0;

    this.minutesDisplay = 0;
    this.hoursDisplay = 0;
    this.secondsDisplay = 0;
    if (this.sub) this.sub.unsubscribe();
  }

  private getSeconds(ticks: number) {
    return this.pad(ticks % 60);
  }

  private getMinutes(ticks: number) {
    return this.pad((Math.floor(ticks / 60)) % 60);
  }

  private getHours(ticks: number) {
    return this.pad(Math.floor((ticks / 60) / 60));
  }

  private pad(digit: any) {
    return digit <= 9 ? '0' + digit : digit;
  }
}
