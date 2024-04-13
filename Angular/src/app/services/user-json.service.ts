import { Injectable } from '@angular/core';
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {Book} from "../model/book";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../model/user";


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

  private baseUrl = 'http://localhost:3000/data/users';

  constructor(private http: HttpClient) { }

  postUser(user: User): Observable<boolean> {
    return this.getUserIfExists(user).pipe(
      switchMap((exists) => {

        if (!exists) {
          this.http.post(this.baseUrl, user, this.httpOptions)
          return of(true);
        } else {
          return of(false);
        }

      })
    );
  }

  private getUserIfExists(user: User): Observable<boolean> {
    return this.http.get<User[]>(this.baseUrl)
      .pipe(
        map((users: User[]) => {
          return users.some(u => u.email === user.email);
        })
      );
  }

}
