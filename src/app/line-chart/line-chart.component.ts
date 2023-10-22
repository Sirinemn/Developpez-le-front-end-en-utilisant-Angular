import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js/auto';
import {ChartService} from '../core/services/chart.service'


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  public chart!:any;
  labeldata: any;
  realdata: any;
  colordata: any;
  constructor(private chartService:ChartService) { }

  ngOnInit(): void {

  }
 

}
  