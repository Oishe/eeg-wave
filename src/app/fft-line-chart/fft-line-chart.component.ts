import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, BaseChartDirective } from 'ng2-charts';
import { channelNames, EEGSample } from 'muse-js';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-fft-line-chart',
  templateUrl: './fft-line-chart.component.html',
  styleUrls: ['./fft-line-chart.component.css'],
})
export class FftLineChartComponent implements OnInit {
  @Input() data: Observable<EEGSample>;

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
  size = 10;
  left = 0;
  right = 50;

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
    this.data.subscribe(sample => {
      sample.data.slice(0, this.channels).forEach((electrode, index) => {
        this.addData(sample.timestamp, electrode, index);
      });
      interval(5000).subscribe(t => {
        // this._chart.refresh();
      });
    });
  }

  addData(timestamp: number, amplitude: number, index: number) {
    this.lineChartData[index].data.shift();
    this.lineChartData[index].data[this.size] = amplitude;
  }
}
