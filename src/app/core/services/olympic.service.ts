import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { catchError, finalize, tap} from 'rxjs/operators';
import { OlympicCountry } from '../models/Olympic';
@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicCountry[]|null >([]);
  message: string = "Error loading data"; 
  private loading: any;

  constructor(private http: HttpClient) {}

  loadInitialData() {
    
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.loading = value;
        this.olympics$.next(value);
      }),
      
      catchError((error, caught) => {
        // TODO: improve error handling
        
        // can be useful to end loading state and let the user know something went wrong
        window.alert(this.message+' '+error.error.message);
        this.olympics$.next(null);
        return caught;
        
      }), finalize(() => this.loading.dismiss())
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
}
