import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/Olympic';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class OlympicService {

  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicCountry[] | null>([]);

  constructor(private http: HttpClient, private router: Router) {}

  loadInitialData() {
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.olympics$.next(value);
      }),
      // TODO: improve error handling
      // can be useful to end loading state and let the user know something went wrong
      catchError(this.handleError)
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
  private handleError(error: HttpErrorResponse) {
    let errorMesaage= "";
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.

        errorMesaage = `Backend returned code ${error.status}, body was: `, error.error;
    }
    // Return an observable with a user-facing error message.
    errorMesaage = 'Something bad happened; please try again later.'
    return throwError(() => new Error(errorMesaage));
  }
}
