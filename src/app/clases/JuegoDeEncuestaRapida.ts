export class JuegoDeEncuestaRapida {

<<<<<<< HEAD
    nombreJuego: string;
    tipo: string;
    clave: string;
    respuestas: any;
=======
    NombreJuego: string;
    Tipo: string;
    Clave: string;
    Respuestas: any;
>>>>>>> a346562d7d469156812194f506e437561e303289
    id: number;
    profesorId: number;
    cuestionarioSatisfaccionId: number;

    // tslint:disable-next-line:max-line-length
    constructor(NombreJuego?: string, Tipo?: string, Clave?: string,
                profesorId?: number, cuestionarioSatisfaccionId?: number) {
<<<<<<< HEAD
        this.nombreJuego = NombreJuego;
        this.tipo = Tipo;
        this.profesorId = profesorId;
        this.clave = Clave;
        this.cuestionarioSatisfaccionId = cuestionarioSatisfaccionId;
        this.respuestas = [];
=======
        this.NombreJuego = NombreJuego;
        this.Tipo = Tipo;
        this.profesorId = profesorId;
        this.Clave = Clave;
        this.cuestionarioSatisfaccionId = cuestionarioSatisfaccionId;
        this.Respuestas = [];
>>>>>>> a346562d7d469156812194f506e437561e303289
    }
}
