import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // j'ai remplacé any par OlympicCountry()
  public olympics$: Observable<OlympicCountry[]|null>= of(null);
  public countryName$!:Observable<string[]|null>;
  public participation$: Observable<Participation[]|null>= of(null);
  constructor(private olympicService: OlympicService) {}
  public chart: any;
  


  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
   
 
  }
  
}
