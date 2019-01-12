import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimerService } from './timer.service';
import { RecorderService } from '../recorder/recorder.service';

@Component({
  selector: 'timer-buttons',
  templateUrl: './timer.buttons.html',
  styleUrls: ['./timer.buttons.css']
})

export class ButtonsComponent implements OnInit, OnDestroy {

  private playStopUnsubscribe: any;
  private playStartUnsubscribe: any;
  private play: boolean;
  private playStart: boolean;

  constructor(private timerService: TimerService, private recording: RecorderService) {}

  ngOnInit() {
    this.playStopUnsubscribe = this.timerService.playStop$.subscribe((res: any) => this.setPlay(res));
    this.playStartUnsubscribe = this.recording.startStop$.subscribe((res: any) => this.setPlayStart(res));
  }

  ngOnDestroy() {
    this.playStopUnsubscribe.unsubscribe();
    this.playStartUnsubscribe.unsubscribe();
  }

  private setPlay(res: any) {
    (res.play) ? this.play = true : this.play = false;
  }

  private setPlayStart(res: any) {
    (res.start) ? this.playStart = true : this.playStart = false;
  }

  playTimer() {
    if (!this.play){
      this.timerService.playTimer();
      this.recording.startRecording();
      this.playStart = true;
    }
    else alert("Timer must be stopped before starting a new recording");
  }

  stopTimer() {
    if (this.play){
      this.timerService.stopTimer();
      this.recording.stopRecording();
      this.playStart = false;
    }
    else alert("Timer must be started before ending a recording");
  }

}
