import { Libro } from "./libro";
import { Usuario } from "./usuario";

export class LibroHistorial {
    id!: string;
    actionPerformedEnum!: string;
    transactionDate!: string;
    libroId!: string;
    usuarioId!: string;

    constructor(actionPerformedEnum: string, libroId: string, usuarioId: string, transactionDate: string) {
        this.actionPerformedEnum = actionPerformedEnum;
        this.libroId = libroId;
        this.usuarioId = usuarioId;
        this.transactionDate = transactionDate;
    }
}