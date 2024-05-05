import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Book} from "../model/book";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookJsonService {

  constructor(private http: HttpClient) { }
  getBooks(url: string): Observable<Book> {
    return new Observable<Book>(observer => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener los datos del JSON');
          }
          return response.json();
        })
        .then(data => {
          observer.next(data as Book);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

}
