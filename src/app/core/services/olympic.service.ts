import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/Olympic';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class OlympicService {

  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicCountry[] | null>([]);
  message: string = 'Error loading data';

  constructor(private http: HttpClient, private router: Router) {}

  loadInitialData() {
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((value) => {
        retry(2), this.olympics$.next(value);
      }),
      // TODO: improve error handling
      // can be useful to end loading state and let the user know something went wrong
      catchError((error, caught) => {
        console.error(error.state);
        this.olympics$.next(null);
        this.olympics$.complete;
        this.router.navigateByUrl('/404');
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
}
