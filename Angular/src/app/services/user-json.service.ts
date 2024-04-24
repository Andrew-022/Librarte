import { Injectable } from '@angular/core';
import {catchError, map, Observable} from "rxjs";
import {Book} from "../model/book";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../model/user";
import {author} from "../model/author";


@Injectable({
  providedIn: 'root'
})
export class UserJsonService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
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

  getBookById(bookId: string): Observable<Book> {
    return this.http.get<any>(`http://localhost:3000/data/books/${bookId}`).pipe(
      map(response => response)
    );
  }

  postBooks(url: string, data: User)  {
    this.http.post(url, data, this.httpOptions)
        .subscribe((response) => {
          console.log("Error with ", response)
        });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/data/users');
  }
  getAuthor(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/data/author');
  }

  getReviews(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/data/reviews');
  }
}
