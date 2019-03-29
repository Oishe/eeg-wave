import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, BaseChartDirective } from 'ng2-charts';
import { channelNames, EEGSample } from 'muse-js';
import { Observable, interval } from 'rxjs';
import { epoch, fft, PSD, bandpassFilter, alphaPower } from '@neurosity/pipes';
import { BandpassFilter } from '../shared/bandpass-filter';

@Component({
  selector: 'app-fft-line-chart',
  templateUrl: './fft-line-chart.component.html',
  styleUrls: ['./fft-line-chart.component.css'],
})
export class FftLineChartComponent implements OnInit {
  @Input() data: Observable<EEGSample>;

  @Input() filter: boolean;

  readonly channels = 4;
  readonly channelNames = channelNames.slice(0, this.channels);
  readonly amplitudes = [];

  public lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Left Temporal' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Left Frontal' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Right Frontal' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Right Temporal' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            min: 0,
            max: 12,
            stepSize: 2,
          },
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'rgba(112,185,252,1)',
      backgroundColor: 'rgba(112,185,252,0.3)',
    },
    {
      borderColor: 'rgba(116,150,161,1)',
      backgroundColor: 'rgba(116,150,161,0.3)',
    },
    {
      borderColor: 'rgba(162,86,178,1)',
      backgroundColor: 'rgba(162,86,178,0.3)',
    },
    {
      borderColor: 'rgba(144,132,246,1)',
      backgroundColor: 'rgba(144,132,246,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];
  size = 32;
  left = 0;
  right = 128;

  @ViewChild(BaseChartDirective) private _chart: BaseChartDirective;

  constructor() {
    // Setting up horizontal axis
    for (let i = 0; i < this.size; i++) {
      this.lineChartLabels.push(
        String((i * (this.right - this.left)) / this.size)
      );
    }
  }

  ngOnInit() {
    this.data
      .pipe(
        epoch({ duration: 256, interval: 100, samplingRate: 256 }),
        bandpassFilter({
          cutoffFrequencies: [2, 50],
          nbChannels: 5,
          samplingRate: 256,
          order: 4,
        }),
        fft({ bins: 64 })
      )
      .subscribe((power: PSD) => {
        this.addDataFiltered(power.psd);
      });
    this.data
      .pipe(
        epoch({ duration: 256, interval: 100, samplingRate: 256 }),
        fft({ bins: 64 })
      )
      .subscribe((power: PSD) => {
        this.addDataUnfiltered(power.psd);
      });
  }

  addData(psd: number[][]) {
    // console.log(psd);
    for (let i = 0; i < 4; i++) {
      this.lineChartData[i].data = psd[i];
    }
    this._chart.update();
  }

  addDataFiltered(psd: number[][]) {
    if (this.filter) {
      this.addData(psd);
    }
  }
  addDataUnfiltered(psd: number[][]) {
    if (!this.filter) {
      this.addData(psd);
    }
  }
}
