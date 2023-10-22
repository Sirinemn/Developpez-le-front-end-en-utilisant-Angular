import { Component,OnInit} from '@angular/core';
import {Chart} from 'chart.js/auto';
import { OlympicService } from '../core/services/olympic.service';
import { OlympicCountry } from '../core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import {ChartService} from '../core/services/chart.service'
import {  Observable,Observer, async } from 'rxjs';



@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  chart:any;
  liste=this.olympicService.getOlympics();
  list_country!:String[];
  //list_country=["Italy","spain","United States","Germany","France"];
  num_medal=[96,54,345,125,113];
  //num_medal!:number[];
  constructor(private chartService:ChartService,private olympicService:OlympicService){};
  ngOnInit(): void {
    this.getCountry();
    this.chartService.createPieChart(this.list_country,this.num_medal);
    
  }
  getCountry(){
    return this.olympicService.getCountryNames().subscribe(
      result=>{
        this.list_country=result;
      }
    )
  }
 /* getMedalNumber(){
    let somme=0;
    for(let i=0;i<5;i++){
      this.olympicService.getCountryById(i).subscribe(
        value=>{
          this.somme+=value
        }

      )
    }
   }*/
}
  
  
  



