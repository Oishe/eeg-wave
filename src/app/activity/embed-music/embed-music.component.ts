import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-embed-music',
  templateUrl: './embed-music.component.html',
  styleUrls: ['./embed-music.component.css'],
})
export class EmbedMusicComponent implements OnInit {
  Songs: String[] = [
    '0-94stones-limit_break_x_survivor',
    '1-ashes_remain-without_you',
    '2-blackbear-do_re_mi',
    '3-khalid-suncity_ft_empress_of',
    '4-marshmello-alone',
    '5-porter_robinson-shelter',
    '6-shakira-chantaje_ft_maluma',
    '7-verzache-waiting_for_you',
  ];
  selectedSong = '';
  audio: any;
  constructor() {}

  ngOnInit() {}

  playBrownNoise() {
    try {
      this.audio.pause();
    } catch (error) {}
    this.audio = new Audio(
      '../../../assets/sounds/' + this.selectedSong + '.mp3'
    );
    this.audio.play();
  }
}
