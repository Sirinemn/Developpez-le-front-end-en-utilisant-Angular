import { Component, OnDestroy, OnInit } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartService } from 'src/app/core/services/chart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, OnDestroy {
  medals: number[] = [];
  list_country: string[] = [];
  num_medal: number[] = [];
  public numberOfCountries: number = 0;
  public numberOfJo: number = 0;
  private httpSubscription!: Subscription;
  public errorMessage: string ="";

  constructor(
    private chartService: ChartService,
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    this.chartData();
  }

  chartData(): void {
    this.httpSubscription = this.olympicService
      .loadInitialData()
      .subscribe((result) => {
        let medalByCountry = new Map();

        for (let i = 0; i < result.length; i++) {
          this.numberOfJo += result[i].participations.length;
          let list_medal = result[i].participations.map((m) => m.medalsCount);
          let sumMedal = list_medal.reduce(
            (accumulator, currentValue) => accumulator + currentValue, 0
          );
          medalByCountry.set(result[i].country, sumMedal);
        }

        medalByCountry.forEach((value: number, key: string) => {
          this.num_medal.push(value);
          this.list_country.push(key);
        });
        this.numberOfCountries = this.list_country.length;
        this.chartService.createPieChart(this.list_country, this.num_medal);
      }, (error) =>{
        this.errorMessage = error;
        console.log(error);
      });
  }
  ngOnDestroy() {
      this.httpSubscription.unsubscribe();
  }
}