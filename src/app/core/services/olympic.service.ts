import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError} from 'rxjs';
import { catchError, finalize, tap} from 'rxjs/operators';
import { Participation } from '../models/Participation';
import { OlympicCountry } from '../models/Olympic';
@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicCountry[]|null >([]);
  message: string = "Error loading data"; 
  private loading = false;

  constructor(private http: HttpClient) {}

  loadInitialData() {
    this.loading = true;
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      
      catchError((error, caught) => {
        // TODO: improve error handling
        
        // can be useful to end loading state and let the user know something went wrong
        window.alert(this.message+' '+error.error.message);
        this.olympics$.next(null);
        return caught;
        
      }), finalize(() => this.loading = false)
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
}
