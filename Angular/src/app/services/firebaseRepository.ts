import {inject, Injectable} from "@angular/core";
import {collection, collectionData, Firestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {author} from "../model/author";

@Injectable({
  providedIn: "root",
})

export class firebaseRepository{
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore,"authors")

  getAuthors(){
    return collectionData(this._collection) as Observable<author[]>
  }
}
