import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-embed-music',
  templateUrl: './embed-music.component.html',
  styleUrls: ['./embed-music.component.css'],
})
export class EmbedMusicComponent implements OnInit {
  Songs: String[] = ['1', '2', '3', '4', '5', '6', '7', '8'];
  selectedSong = '';
  audio: any;
  constructor() {}

  ngOnInit() {
    this.audio = new Audio('../../../assets/sounds/BrownNoise30secs.mp3');
  }

  playBrownNoise() {
    this.audio.play();
  }
}
