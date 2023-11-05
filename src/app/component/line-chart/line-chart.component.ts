import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartService } from 'src/app/core/services/chart.service';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, OnDestroy {
  medals_number: number[] = [];
  years: number[] = [];
  public selectedCountry = '';
  finalCountry!: OlympicCountry;
  public numberOfEntries: Number = 0;
  public totalNumberOfAthletes: Number = 0;
  public totalNumberOfMedals: Number = 0;
  private httpSubscription!: Subscription;


  constructor(
    private chartService: ChartService,
    private olympicService: OlympicService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsId) => {
      this.selectedCountry = paramsId['country'];
    });

    this.chartData();
  }
  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  chartData() {
    this.httpSubscription = this.olympicService
      .loadInitialData()
      .subscribe((olympics) => {
        olympics
          .filter((olympic) => olympic.country === this.selectedCountry)
          .map((x) => (this.finalCountry = x));
        let numbreMedalByYear = new Map();
        this.finalCountry.participations.map((participation) => {
          numbreMedalByYear.set(participation.year, participation.medalsCount);
        });
        numbreMedalByYear.forEach((value: number, key: number) => {
          this.years.push(key);
          this.medals_number.push(value);
        });
        this.chartService.createLineChart(this.years, this.medals_number);
        this.totalNumberOfMedals = this.medals_number.reduce(
          (acc, curr) => acc + curr,
          0
        );
        let listNumberOfAthletes = this.finalCountry.participations.map(
          (value) => value.athleteCount
        );
        this.totalNumberOfAthletes = listNumberOfAthletes.reduce(
          (acc, curr) => acc + curr,
          0
        );
        this.numberOfEntries = this.finalCountry.participations.length;
      }, (error) =>{
        console.log(error);
      });
  }
  ngOnDestroy(): void {
      this.httpSubscription.unsubscribe();
    
  }
}