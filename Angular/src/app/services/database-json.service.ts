import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {BookResponse} from "../model/book";

@Injectable({
  providedIn: 'root'
})
export class DatabaseJSONService {

  constructor() { }

  getBooks(url: string): Observable<BookResponse> {
    return new Observable<BookResponse>(observer => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener los datos del JSON');
          }
          return response.json();
        })
        .then(data => {
          observer.next(data as BookResponse);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
}
