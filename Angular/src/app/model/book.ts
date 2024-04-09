export interface BookResponse {
  books: Book[];
}
export interface Book {
  imagen: string;
  titulo: string;
  autor: string;
  precio: number;
}

