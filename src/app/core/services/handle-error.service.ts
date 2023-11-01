import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {
  

  constructor(private toaster: ToastrService) { }

  public handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
       errorMessage = `Àn error ocuured: ${err.error.message}`;
    } else {
      errorMessage = `Something Went Wrong`
    }
    this.toaster.error(errorMessage);
  }
}
