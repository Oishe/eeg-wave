import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
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

  buffer_1: any;
  buffer_2: any;
  activity_1: any;
  activity_2: any;
  activity_3: any;

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
    const timer = interval(1000);
    this.sub = timer.subscribe(
      t => {
        this.ticks = this.start + t;

        this.secondsDisplay = this.getSeconds(this.ticks);
        this.minutesDisplay = this.getMinutes(this.ticks);
        this.hoursDisplay = this.getHours(this.ticks);
      }
    );
  }

  private stopTimer() {
    alert("Duration of recording: " + this.ticks + " seconds");

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
