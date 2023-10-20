import { Component,OnInit} from '@angular/core';
import {Chart} from 'chart.js/auto';
import { OlympicService } from '../core/services/olympic.service';
import { OlympicCountry } from '../core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import {ChartService} from '../core/services/chart.service'
import {  Observable,Observer } from 'rxjs';



@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  public chart: any;
  list_country!:String[];
  //list_country=this.olympicService.getCountryNames();
  //list_country=["Italy","spain","United States","Germany","France"];
  list_medal=[96,54,345,125,113];
  constructor(private chartService:ChartService,private olympicService:OlympicService){};
  ngOnInit(): void {
    this.getCountry();
    this.chartService.createChart(this.list_country,this.list_medal);
  }
  getCountry(){
    this.olympicService.getCountryNames().subscribe(
      result=>{
        this.list_country=result;
      }
    )
  }
  getMedalNumber(){
    
  }
  }


