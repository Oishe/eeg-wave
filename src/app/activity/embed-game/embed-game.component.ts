import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { RecorderService } from '../../recorder/recorder.service';

@Component({
  selector: 'app-embed-game',
  templateUrl: './embed-game.component.html',
  styleUrls: ['./embed-game.component.css']
})
export class EmbedGameComponent implements OnInit, OnDestroy{
  private recorderUnsubscribe: any;
  private startStop: boolean;
  gameplay = false;

  constructor(private recorderService: RecorderService) { }
  ngOnInit() {
    this.recorderUnsubscribe = this.recorderService.startStop$.subscribe((res: any) => this.setStartStop(res));
  }
  ngOnDestroy() {
    this.recorderUnsubscribe.unsubscribe();
  }

  private setStartStop(res: any){
    (res.start) ? this.startStop = true : this.startStop = false;
  }

  updateVar(){
    this.gameplay = true;
    this.recorderService.gamePlay();
  }
}
