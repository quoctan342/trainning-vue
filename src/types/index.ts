export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  cost: number;
  sale?: number;
  img?: string;
  publishingdate: string;
}

export interface Joke {
  joke: string;
  id: string;
  status?: number;
  message?: string | undefined;
}

export interface BookState {
  books: Book[];
}
