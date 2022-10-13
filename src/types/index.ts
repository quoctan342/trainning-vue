export interface Book {
    title: string;
    author: string;
    category: string;
    cost: number;
    sale?: number;
    img: string;
}

export interface Joke {
    joke: string;
    id: string;
    status?: number;
    message?: string | undefined;
}
