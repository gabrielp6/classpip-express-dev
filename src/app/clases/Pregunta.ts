export class Pregunta {
<<<<<<< HEAD
    titulo: string;
    tipo: string; // "Cuatro opciones", "Verdadero o falso", "Respuesta abierta" o "Emparejamiento"
    pregunta: string;
    tematica: string;
    imagen: string;

    feedbackCorrecto: string;
    feedbackIncorrecto: string;
    id: number;
    profesorId: number;

    respuestaCorrecta: string; // "Cuatro opciones", "Respuesta abierta" y "Verdadero o falso"
    respuestaIncorrecta1: string; // "Cuatro opciones"
    respuestaIncorrecta2: string; // "Cuatro opciones"
    respuestaIncorrecta3: string; // "Cuatro opciones"

    emparejamientos: any[]; // ""Emparejamiento"
=======
    Titulo: string;
    Tipo: string; // "Cuatro opciones", "Verdadero o falso", "Respuesta abierta" o "Emparejamiento"
    Pregunta: string;
    Tematica: string;
    Imagen: string;

    FeedbackCorrecto: string;
    FeedbackIncorrecto: string;
    id: number;
    profesorId: number;

    RespuestaCorrecta: string; // "Cuatro opciones", "Respuesta abierta" y "Verdadero o falso"
    RespuestaIncorrecta1: string; // "Cuatro opciones"
    RespuestaIncorrecta2: string; // "Cuatro opciones"
    RespuestaIncorrecta3: string; // "Cuatro opciones"

    Emparejamientos: any[]; // ""Emparejamiento"
>>>>>>> a346562d7d469156812194f506e437561e303289


    // tslint:disable-next-line:one-line
    // tslint:disable-next-line:max-line-length
    constructor(titulo?: string, tipo?: string, pregunta?: string, tematica?: string,  imagen?: string, feedbackCorrecto?: string, feedbackIncorrecto?: string) {
      // Estos son los campos que tienen todos los tipos de pregunta
      // El resto de atributos hay que ponerselos aparte, cuando se sepa de qué tipo es,
<<<<<<< HEAD
        this.titulo = titulo;
        this.tipo = tipo,
        this.pregunta = pregunta;
        this.tematica = tematica;
        this.imagen = imagen;
        this.feedbackCorrecto = feedbackCorrecto;
        this.feedbackIncorrecto = feedbackIncorrecto;
=======
        this.Titulo = titulo;
        this.Tipo = tipo,
        this.Pregunta = pregunta;
        this.Tematica = tematica;
        this.Imagen = imagen;
        this.FeedbackCorrecto = feedbackCorrecto;
        this.FeedbackIncorrecto = feedbackIncorrecto;
>>>>>>> a346562d7d469156812194f506e437561e303289

    }
}
