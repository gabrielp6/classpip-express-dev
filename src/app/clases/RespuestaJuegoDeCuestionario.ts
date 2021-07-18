  export class RespuestaJuegoDeCuestionario {
    id: number;
<<<<<<< HEAD
    respuesta: string[]; //puede ser un vector de string si la pregunta es de tipo "Emparejamiento" o un string en cualquier otro caso
=======
    Respuesta: string[]; //puede ser un vector de string si la pregunta es de tipo "Emparejamiento" o un string en cualquier otro caso
>>>>>>> a346562d7d469156812194f506e437561e303289
    alumnoJuegoDeCuestionarioId: number;
    preguntaId: number;
    constructor(alumnoJuegoDeCuestionarioId?: number, preguntaId?: number, Respuesta?: string[]) {
  
      this.alumnoJuegoDeCuestionarioId = alumnoJuegoDeCuestionarioId;
      this.preguntaId = preguntaId;
<<<<<<< HEAD
      this.respuesta = Respuesta;
=======
      this.Respuesta = Respuesta;
>>>>>>> a346562d7d469156812194f506e437561e303289
    }
  }
  