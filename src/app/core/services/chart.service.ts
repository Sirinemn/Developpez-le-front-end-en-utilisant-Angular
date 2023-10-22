import {Chart} from 'chart.js/auto';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class ChartService {
  public chart: any;

  createPieChart(country:String[],medal:number[]){

    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart

    data: {// values on X-Axis
        labels: country,
	       datasets: [{
    label: 'Medaille',
    data: medal,
    backgroundColor: [
      'red',
      'pink',
      'green',
	  'yellow',
      'orange',
      'blue',			
    ],
    hoverOffset: 4
  }],
      },
      options: {
        aspectRatio:2.5
      }

    });
  }
  createLineChart(labeldata: any, realdata: any, colordata: any) {

  }

}
