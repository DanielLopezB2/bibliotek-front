import { LibroHistorial } from "./history";

export class Usuario {
    id!: string;
    nombre!: string;
    email!: string;
    libroHistorial!: LibroHistorial[];

    constructor(nombre: string, email: string) {
        this.nombre = nombre;
        this.email = email;
    }
}