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
  listCountry: string[] = [];
  numMedal: number[] = [];
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
          let listMedal = result[i].participations.map((m) => m.medalsCount);
          let sumMedal = listMedal.reduce(
            (accumulator, currentValue) => accumulator + currentValue, 0
          );
          medalByCountry.set(result[i].country, sumMedal);
        }

        medalByCountry.forEach((value: number, key: string) => {
          this.numMedal.push(value);
          this.listCountry.push(key);
        });
        this.numberOfCountries = this.listCountry.length;
        this.chartService.createPieChart(this.listCountry, this.numMedal);
      }, (error) =>{
        this.errorMessage = error;
        console.log(error);
        debugger;
      });
  }
  ngOnDestroy() {
      this.httpSubscription.unsubscribe();
  }
}