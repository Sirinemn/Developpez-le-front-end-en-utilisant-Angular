import { Component, OnInit } from '@angular/core';
import {ChartService} from 'src/app/core/services/chart.service'
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  medals_number: number[] = [];
  years: number[] = [];
  public selectedCountry = "";
  finalCountry!: OlympicCountry;
  public numberOfEntries: Number = 0;
  public totalNumberOfAthletes: Number = 0;
  public totalNumberOfMedals: Number = 0;

  constructor(private chartService:ChartService,private olympicService:OlympicService,private activatedRoute: ActivatedRoute){
  };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(paramsId => {
      this.selectedCountry = paramsId['country'];
  });

    this.chartData();

  }
  
  chartData(){

    this.olympicService.loadInitialData().subscribe(
      result =>{
        result.filter((element) => element.country === this.selectedCountry).map(x => this.finalCountry=x);
        let numbreMedalByYear = new Map();
        this.finalCountry.participations.map((value) => {
          numbreMedalByYear.set(value.year,value.medalsCount)
        })
        numbreMedalByYear.forEach((value: number,key: number) => {
          this.years.push(key);
          this.medals_number.push(value);
        })
        this.chartService.createLineChart(this.years,this.medals_number);
        this.totalNumberOfMedals  = this.medals_number.reduce((acc, curr) => acc + curr,0);
        let listNumberOfAthletes = this.finalCountry.participations.map( value => value.athleteCount);
        this.totalNumberOfAthletes = listNumberOfAthletes.reduce((acc, curr) => acc + curr ,0);
        this.numberOfEntries = this.finalCountry.participations.length;
      }
      )
    
  }

}
  