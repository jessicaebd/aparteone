import { Component, Input } from "@angular/core";

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexAnnotations,
  ApexDataLabels,
  ApexNonAxisChartSeries,
  ApexStroke,
  ApexLegend,
  ApexYAxis,
  ApexResponsive,
  ApexPlotOptions,
  ApexTooltip,
  ApexFill,
  ApexStates,
  ApexGrid,
  ApexTheme
} from "ng-apexcharts";

export interface ChartOptions {
  chart?: ApexChart;
  annotations?: ApexAnnotations;
  colors?: string[];
  dataLabels?: ApexDataLabels;
  series?: ApexAxisChartSeries | ApexNonAxisChartSeries;
  stroke?: ApexStroke;
  labels?: string[];
  legend?: ApexLegend;
  fill?: ApexFill;
  tooltip?: ApexTooltip;
  plotOptions?: ApexPlotOptions;
  responsive?: ApexResponsive[];
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis | ApexYAxis[];
  grid?: ApexGrid;
  states?: ApexStates;
  title?: ApexTitleSubtitle;
  subtitle?: ApexTitleSubtitle;
  theme?: ApexTheme;
};

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  @Input() chartOptions!: Partial<ChartOptions> | any;
  // @Input() chart!: ApexChart;
  // @Input() annotations!: ApexAnnotations;
  // @Input() colors!: string[];
  // @Input() dataLabels!: ApexDataLabels;
  // @Input() series!: ApexAxisChartSeries | ApexNonAxisChartSeries;
  // @Input() stroke!: ApexStroke;
  // @Input() labels!: string[];
  // @Input() legend!: ApexLegend;
  // @Input() fill!: ApexFill;
  // @Input() tooltip!: ApexTooltip;
  // @Input() plotOptions!: ApexPlotOptions;
  // @Input() responsive!: ApexResponsive[];
  // @Input() xaxis!: ApexXAxis;
  // @Input() yaxis!: ApexYAxis | ApexYAxis[];
  // @Input() grid!: ApexGrid;
  // @Input() states!: ApexStates;
  // @Input() title!: ApexTitleSubtitle;
  // @Input() subtitle!: ApexTitleSubtitle;
  // @Input() theme!: ApexTheme;

  constructor() {

  }
}
