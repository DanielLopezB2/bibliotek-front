import { LibroHistorial } from "./history";

export class Libro {
    id!: string;
    titulo!: string;
    autor!: string;
    year!: number;
    isAvailable: boolean;
    libroHistorial!: LibroHistorial[];
    bookActualStatusEnum!: string;

    constructor(titulo: string, autor: string, year: number, isAvailable: boolean, bookActualStatusEnum: string) {
        this.titulo = titulo;
        this.autor = autor;
        this.year = year;
        this.isAvailable = isAvailable;
        this.bookActualStatusEnum = bookActualStatusEnum;
    }
}