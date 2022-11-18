export interface Book {
  id: number | string | undefined;
  title: string;
  author: string;
  category: string;
  cost: number;
  sale?: number;
  img?: string;
  publishingdate: string;
}

export interface FormBook {
  title: number | string | undefined;
  author: string;
  category: string;
  cost: number;
  sale?: number;
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
