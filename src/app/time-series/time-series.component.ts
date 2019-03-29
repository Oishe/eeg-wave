import 'hammerjs';
import {
  Component,
  ElementRef,
  Input,
  AfterViewInit,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Observable } from 'rxjs';
import { SmoothieChart, TimeSeries } from 'smoothie';

import { channelNames, EEGSample } from 'muse-js';
import { BandpassFilter } from '../shared/bandpass-filter';
import { ChartService } from '../shared/chart.service';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

const samplingFrequency = 256;

@Component({
  selector: 'app-time-series',
  templateUrl: './time-series.component.html',
  styleUrls: ['./time-series.component.css'],
})
export class TimeSeriesComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() data: Observable<EEGSample>;

  @Input() filter: boolean;

  readonly channels = 4;
  readonly channelNames = channelNames.slice(0, this.channels);
  readonly amplitudes = [];
  readonly uVrms = [0, 0, 0, 0];
  readonly uMeans = [0, 0, 0, 0];

  readonly options = this.chartService.getChartSmoothieDefaults({
    millisPerPixel: 8,
    maxValue: 500,
    minValue: -500,
  });
  readonly colors = this.chartService.getColors();
  readonly canvases = Array(this.channels)
    .fill(0)
    .map(() => new SmoothieChart(this.options));
  private readonly lines = Array(this.channels)
    .fill(0)
    .map(() => new TimeSeries());
  private readonly bandpassFilters: BandpassFilter[] = [];

  constructor(private view: ElementRef, private chartService: ChartService) {
    this.chartService = chartService;

    for (let i = 0; i < this.channels; i++) {
      this.bandpassFilters[i] = new BandpassFilter(samplingFrequency, 2, 50);
    }
  }

  get AmplitudeScale() {
    return this.canvases[0].options.maxValue;
  }

  set AmplitudeScale(value: number) {
    for (const canvas of this.canvases) {
      canvas.options.maxValue = value;
      canvas.options.minValue = -value;
    }
  }

  get timeScale() {
    return this.canvases[0].options.millisPerPixel;
  }

  set timeScale(value: number) {
    for (const canvas of this.canvases) {
      canvas.options.millisPerPixel = value;
    }
  }

  ngAfterViewInit() {
    const channels = this.view.nativeElement.querySelectorAll('canvas');
    this.canvases.forEach((canvas, index) => {
      canvas.streamTo(channels[index]);
    });
  }

  ngOnInit() {
    this.addTimeSeries();
    this.data.subscribe(sample => {
      sample.data.slice(0, this.channels).forEach((electrode, index) => {
        this.draw(sample.timestamp, electrode, index);
      });
    });
  }

  addTimeSeries() {
    this.lines.forEach((line, index) => {
      this.canvases[index].addTimeSeries(line, {
        lineWidth: 2,
        strokeStyle: this.colors[index].borderColor,
      });
    });
  }

  draw(timestamp: number, amplitude: number, index: number) {
    const filter = this.bandpassFilters[index];
    if (this.filter && !isNaN(amplitude)) {
      amplitude = filter.next(amplitude);
    }

    if (!isNaN(amplitude)) {
      this.uMeans[index] = 0.995 * this.uMeans[index] + 0.005 * amplitude;
      this.uVrms[index] = Math.sqrt(
        0.995 * this.uVrms[index] ** 2 +
          0.005 * (amplitude - this.uMeans[index]) ** 2
      );
    }

    this.lines[index].append(timestamp, amplitude);
    this.amplitudes[index] = amplitude.toFixed(2);
  }

  ngOnDestroy() {}
}
