import {inject, Injectable} from "@angular/core";
import {collection, collectionData, Firestore, getDoc, doc, DocumentSnapshot, addDoc} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {author} from "../model/author";
import {Book} from "../model/book";
import {QuerySnapshot} from "@angular/fire/compat/firestore";
import {getDocs} from "@angular/fire/firestore/lite";
import {review} from "../model/reviews";
import {category} from "../model/category";

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

  async getCategoryById(categoryid: string): Promise<category | undefined> {
    try {
      const docRef = doc(this._firestore, "collections", categoryid);
      const docSnap: DocumentSnapshot<any> = await getDoc(docRef);

      if (docSnap.exists()) {
        return { ...docSnap.data(), id: docSnap.id } as category;
      } else {
        console.log("No se encontró ninguna categoria con el ID proporcionado.");
        return undefined;
      }
    } catch (error) {
      console.error("Error al obtener la categoria:", error);
      return undefined;
    }
  }


  async getAllBooks(){
    return collectionData(collection(this._firestore,"books")) as Observable<Book[]>
  }

  async addEmptyBook(): Promise<void> {
    try {
      const emptyBook: Book = {
        id: '',
        titulo: "",
        sinopsis: "",
        score: 0,
        nReviews: 0,
        publicationDate: "",
        precio: 0,
        num_pag: 480,
        language: "Castellano",
        isbn: 0,
        encuadernacion: "Tapa dura",
        editorial: "",
        imagen: "",
        autor: "",
        author_id: "",
        alto: 12,
        ancho: 7,
        grueso: 3,
        peso: 250,
      };

      await addDoc(collection(this._firestore, "books"), emptyBook);
      console.log("Libro añadido correctamente con parámetros vacíos.");
    } catch (error) {
      console.error("Error al añadir el libro:", error);
    }
  }

  async addEmptyAuthor(): Promise<void> {
    try {
      const emptyAuthor: author = {
        id: "",
        name: "",
        biography: "",
        cover: "",
        works: [],
      };

      await addDoc(collection(this._firestore, "authors"), emptyAuthor);
      console.log("Autor añadido correctamente con parámetros vacíos.");
    } catch (error) {
      console.error("Error al añadir el autor:", error);
    }
  }

  async addReview(bookId:string, comentario:string, rating: number, user: string): Promise<void> {
    try {
      const review: review = {
        picture: "",
        publicationDate: "",
        rating: rating,
        review: comentario,
        user: user,
      };

      await addDoc(collection(this._firestore, `books/${bookId}/reviews`), review);
      console.log("Autor añadido correctamente con parámetros vacíos.");
    } catch (error) {
      console.error("Error al añadir el autor:", error);
    }
  }

  getReviews(bookId: string): Observable<review[]> {
    return collectionData(collection(this._firestore, `books/${bookId}/reviews`)) as Observable<review[]>;
  }
}
