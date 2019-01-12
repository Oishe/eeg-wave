import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class RecorderService {

  private start: boolean = false;
  private stop: boolean = true;
  private gameplay: boolean = true;
  public startStop$ = new EventEmitter();

  public startRecording() {
    this.start = true;
    this.stop = false;

    this.startStop$.emit({
      start: this.start
    });
  }

  public stopRecording() {
    this.start = false;
    this.stop = true;

    this.startStop$.emit({
      stop: this.stop
    });
  }

}
