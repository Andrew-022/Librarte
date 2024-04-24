import {inject, Injectable} from "@angular/core";
import {collection, collectionData, Firestore, getDoc, DocumentData, doc, DocumentSnapshot } from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {author} from "../model/author";
import {Book} from "../model/book";

@Injectable({
  providedIn: "root",
})

export class firebaseRepository{
  private _firestore = inject(Firestore);

  getAuthors(){
    return collectionData(collection(this._firestore,"authors")) as Observable<author[]>
  }
  async getAuthorById(authorId: string): Promise<author | undefined> {
    try {
      const docRef = doc(this._firestore, "authors", authorId);
      const docSnap: DocumentSnapshot<any> = await getDoc(docRef);

      if (docSnap.exists()) {
        return { ...docSnap.data(), id: docSnap.id } as author;
      } else {
        console.log("No se encontró ningún autor con el ID proporcionado.");
        return undefined;
      }
    } catch (error) {
      console.error("Error al obtener el autor:", error);
      return undefined;
    }
  }

  async getBookById(bookId: string): Promise<Book | undefined> {
    try {
      const docRef = doc(this._firestore, "books", bookId);
      const docSnap: DocumentSnapshot<any> = await getDoc(docRef);

      if (docSnap.exists()) {
        return { ...docSnap.data(), id: docSnap.id } as Book;
      } else {
        console.log("No se encontró ningún libro con el ID proporcionado.");
        return undefined;
      }
    } catch (error) {
      console.error("Error al obtener el libro:", error);
      return undefined;
    }
  }
}
