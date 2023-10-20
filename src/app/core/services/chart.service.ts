import {Chart} from 'chart.js/auto';
import { OlympicCountry } from '../models/Olympic';
import { Observable,  } from 'rxjs';
import { Participation } from 'src/app/core/models/Participation';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
  })
export class ChartService {
  public chart: any;

  createChart(country:String[],medal:number[]){

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
  }


