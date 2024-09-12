/* en esta versión los nombres de los atributos de las clases están en minúsculas y en el resto de las 
aplicaciones en mayuscula, porque aun hay que actualizar eso en todas las demas. Mientras tanto, tengo que hacer
esa chapuza de convertir los objetos que viene de la API, que vienen con mayusculas, a minusculas, antes de entregarlos
al componente que lo pide, y viceversa 
*/

import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Http, HttpOptions } from '@capacitor-community/http';


import { Alumno, JuegoDeEncuestaRapida, AlumnoJuegoDeCuestionarioSatisfaccion, CuestionarioSatisfaccion } from '../clases';
import { AlumnoJuegoDeCuestionario } from '../clases/AlumnoJuegoDeCuestionario';
import { Cuestionario } from '../clases/Cuestionario';
import { Pregunta } from '../clases/Pregunta';
import { RespuestaJuegoDeCuestionario } from '../clases/RespuestaJuegoDeCuestionario';
import * as URL from '../URLs/urls';

@Injectable({
  providedIn: 'root'
})

export class PeticionesAPIService {

  private base = URL.host;


  private APIUrlAlumnoJuegoDeCuestionario = this.base + '3000/api/AlumnosJuegoDeCuestionario';
  private APIUrlCuestionario = this.base + '3000/api/Cuestionarios';
  private APIUrlRespuestasJuegoDeCuestionario = this.base + '3000/api/respuestasJuegoDeCuestionario';
  private APIUrlAlumnoJuegoDeCuestionarioSatisfaccion = this.base + '3000/api/alumnosJuegoDeCuestionarioSatisfaccion';
  private APIUrlCuestionarioSatisfaccion = this.base + '3000/api/cuestionariosSatisfaccion';
  private APIUrlJuegoDeEncuestaRapida =  this.base + '3000/api/juegosDeEncuestaRapida';
  private APIUrlJuegoDeVotacionRapida = this.base + '3000/api/juegosDeVotacionRapida';
  private APIUrlJuegoDeCuestionarioRapido = this.base + '3000/api/juegosDeCuestionarioRapido';
  private APIUrlJuegoDeCuestionario = this.base + '3000/api/JuegosDeCuestionario';
  private APIUrlJuegoDeCogerTurnoRapido = this.base + '3000/api/juegosDeCogerTurnoRapido';

  constructor(
    private http: HttpClient,
    //private Http: HttpOptions,
  ) { }

/*
  public DameJuegoDeCogerTurnoRapidoo (clave: string) {
    const options: HttpOptions = { url:'https://meowfacts.herokuapp.com/?count=3+', };

    //this.APIUrlJuegoDeCogerTurnoRapido + '?filter[where][Clave]=' + clave

    return from(Http.get(options));

  }
*/

  public DameJuegoDeCogerTurnoRapidoo (clave: string): Observable<any> {
    return this.http.get<any>(this.APIUrlJuegoDeCogerTurnoRapido
    + '?filter[where][Clave]=' + clave);
  }
  
  public  DameJuegoDeCogerTurnoRapido (clave: string): Observable<any> {
      const juegoObservable: Observable<any> = new Observable( obs => {
        this.http.get<any>(this.APIUrlJuegoDeCogerTurnoRapido
          + '?filter[where][Clave]=' + clave)    
      .subscribe (res => {
        let juegoArreglado;
        if (res == null) {
          //o undefined
          juegoArreglado = undefined;
        } else {
          const juego = res[0];
          console.log ('este es el juego que ha llegado **^**' , juego);
          juegoArreglado = {
            id: juego.id,
            nombreJuego: juego.NombreJuego,
            tipo: juego.Tipo,
            clave: juego.Clave,
            turnos: juego.Turnos,
            presentacion: juego.Presentacion,
            profesorId: juego.profesorId
          };
        }
        obs.next (juegoArreglado);
      });
    });
    return juegoObservable;
  }

  /*

  public  DameJuegoDeCogerTurnoRapido (clave: string) {

    const options: HttpOptions = { url: this.APIUrlJuegoDeCogerTurnoRapido + '?filter[where][Clave]=' + clave};
      const juegoObservable: Observable<any> = new Observable( obs => {
        from(Http.get(options))    
      .subscribe (res => {
        let juegoArreglado;
        if (res == null) {
          //o undefined
          juegoArreglado = undefined;
        } else {
          const juego = res[0];
          console.log ('este es el juego que ha llegado **^**' , juego);
          juegoArreglado = {
            id: juego.id,
            nombreJuego: juego.NombreJuego,
            tipo: juego.Tipo,
            clave: juego.Clave,
            turnos: juego.Turnos,
            presentacion: juego.Presentacion,
            profesorId: juego.profesorId
          };
        }
        obs.next (juegoArreglado);
      });
    });
    return juegoObservable;
  }

  */


  // OBTENEMOS DATOS DEL CUESTIONARIO SELECCIONADO
  public DameCuestionario(cuestionarioId: number): Observable<Cuestionario> {
    const cuestionarioObservable: Observable<Cuestionario> = new Observable((obs) => {
      this.http.get<any>(this.APIUrlCuestionario + '/' + cuestionarioId)
      .subscribe (cuestionario => {
        const cuestionarioArreglado = {
          titulo: cuestionario.Titulo,
          descripcion: cuestionario.Descripcion,
          profesorId: cuestionario.profesorId,
          id: cuestionario.id
        };
      
        obs.next (cuestionarioArreglado);
      });
    });
    return cuestionarioObservable;
  }


  /*

    public DameCuestionario2(cuestionarioId: number) {
    const options: HttpOptions = { url: this.APIUrlCuestionario + '/' + cuestionarioId}
    const cuestionarioObservable: Observable<Cuestionario> = new Observable((obs) => {
      from(Http.get(options))
      .subscribe (cuestionario => {
        const cuestionarioArreglado = {
          titulo: cuestionario.Titulo,
          descripcion: cuestionario.Descripcion,
          profesorId: cuestionario.profesorId,
          id: cuestionario.id
        };
      
        obs.next (cuestionarioArreglado);
      });
    });
    return cuestionarioObservable;
  } 
  */ 
  
  

  // OBTENEMOS LAS PREGUNTAS DEL CUESTIONARIO SELECCIONADO
  public DamePreguntasCuestionario(cuestionarioId: number): Observable<Pregunta[]> {

    const preguntasObservable: Observable<Pregunta[]> = new Observable((obs) => {
      return this.http.get<any[]>(this.APIUrlCuestionario + '/' + cuestionarioId + '/Preguntas')
      .subscribe (preguntas => {
        const preguntasArregladas = [];
        preguntas.forEach (pregunta => {
          const preguntaArreglada = {
            titulo: pregunta.Titulo,
            tipo: pregunta.Tipo, // "Cuatro opciones", "Verdadero o falso", "Respuesta abierta" o "Emparejamiento"
            pregunta: pregunta.Pregunta,
            tematica: pregunta.Tematica,
            imagen: pregunta.Imagen,
        
            feedbackCorrecto: pregunta.FeedbackCorrecto,
            feedbackIncorrecto: pregunta.FeedbackIncorrecto,
            id: pregunta.id,
            profesorId: pregunta.profesorId,
        
            respuestaCorrecta: pregunta.RespuestaCorrecta, // "Cuatro opciones", "Respuesta abierta" y "Verdadero o falso"
            respuestaIncorrecta1: pregunta.RespuestaIncorrecta1, // "Cuatro opciones"
            respuestaIncorrecta2: pregunta.RespuestaIncorrecta2, // "Cuatro opciones"
            respuestaIncorrecta3: pregunta.RespuestaIncorrecta3, // "Cuatro opciones"
        
            emparejamientos: pregunta.Emparejamientos // ""Emparejamiento"
            
          };
          preguntasArregladas.push (preguntaArreglada);
        });
        obs.next (preguntasArregladas);
      });
    });
    return preguntasObservable;
  }


  
  /*
    public DamePreguntasCuestionario(cuestionarioId: number) {
    const options: HttpOptions = {url: this.APIUrlCuestionario + '/' + cuestionarioId + '/Preguntas'}
    const preguntasObservable: Observable<Pregunta[]> = new Observable((obs) => {
      return from(Http.get(options))
      .subscribe (preguntas => {
        const preguntasArregladas = [];
        preguntas.forEach (pregunta => {
          const preguntaArreglada = {
            titulo: pregunta.Titulo,
            tipo: pregunta.Tipo, // "Cuatro opciones", "Verdadero o falso", "Respuesta abierta" o "Emparejamiento"
            pregunta: pregunta.Pregunta,
            tematica: pregunta.Tematica,
            imagen: pregunta.Imagen,
        
            feedbackCorrecto: pregunta.FeedbackCorrecto,
            feedbackIncorrecto: pregunta.FeedbackIncorrecto,
            id: pregunta.id,
            profesorId: pregunta.profesorId,
        
            respuestaCorrecta: pregunta.RespuestaCorrecta, // "Cuatro opciones", "Respuesta abierta" y "Verdadero o falso"
            respuestaIncorrecta1: pregunta.RespuestaIncorrecta1, // "Cuatro opciones"
            respuestaIncorrecta2: pregunta.RespuestaIncorrecta2, // "Cuatro opciones"
            respuestaIncorrecta3: pregunta.RespuestaIncorrecta3, // "Cuatro opciones"
        
            emparejamientos: pregunta.Emparejamientos // ""Emparejamiento"
            
          };
          preguntasArregladas.push (preguntaArreglada);
        });
        obs.next (preguntasArregladas);
      });
    });
    return preguntasObservable;
  }
  
  */

  // ESTABLECE LA NOTA OBTENIDA POR EL ALUMNO EN EL CUESTIONARIO
  // ¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿
  public PonerNotaAlumnoJuegoDeCuestionario(alumnoJuegoDeCuestionario: AlumnoJuegoDeCuestionario, alumnoJuegoDeCuestionarioId: number): Observable<AlumnoJuegoDeCuestionario> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<AlumnoJuegoDeCuestionario>(this.APIUrlAlumnoJuegoDeCuestionario + '/' + alumnoJuegoDeCuestionarioId, alumnoJuegoDeCuestionario);
  }

  /*
  public PonerNotaAlumnoJuegoDeCuestionario(alumnoJuegoDeCuestionario: AlumnoJuegoDeCuestionario, alumnoJuegoDeCuestionarioId: number) {
    // tslint:disable-next-line:max-line-length
    return from(Http.put(this.APIUrlAlumnoJuegoDeCuestionario + '/' + alumnoJuegoDeCuestionarioId, alumnoJuegoDeCuestionario));
  }
  */

  //????????????????????????????
  public DameAlumnosJuegoDeCuestionario(juegoDeCuestionarioId: number): Observable<Alumno[]> {
    const alumnosObservable: Observable<Alumno[]> = new Observable((obs) => {
      this.http.get<any[]>(this.APIUrlJuegoDeCuestionario + '/' + juegoDeCuestionarioId + '/alumnos')
      .subscribe ( alumnos => {
        const alumnosArreglados = [];
        alumnos.forEach (alumno => {
          const alumnoArreglado = {
            nombre: alumno.Nombre,
            primerApellido: alumno.PrimerApellido,
            segundoApellido: alumno.SegundoApellido,
            imagenPerfil: alumno.ImagenPerfil,
            username: alumno.Username,
            password: alumno.Password,
            email: alumno.Email,
            permisoCambioImagenPerfil: alumno.PermisoCambioImagenPerfil,
            profesorId: alumno.profesorId,
            id: alumno.id
          };
          alumnosArreglados.push (alumnoArreglado);
        });
        obs.next (alumnosArreglados);

      });

    });
    return alumnosObservable;
  }

/*
  public DameAlumnosJuegoDeCuestionario2(juegoDeCuestionarioId: number){
    const options: HttpOptions = {url: this.APIUrlJuegoDeCuestionario + '/' + juegoDeCuestionarioId + '/alumnos'}
    const alumnosObservable: Observable<Alumno[]> = new Observable((obs) => {
      from(Http.get(options))
      .subscribe ( alumnos => {
        const alumnosArreglados = [];
        alumnos.forEach (alumno => {
          const alumnoArreglado = {
            nombre: alumno.Nombre,
            primerApellido: alumno.PrimerApellido,
            segundoApellido: alumno.SegundoApellido,
            imagenPerfil: alumno.ImagenPerfil,
            username: alumno.Username,
            password: alumno.Password,
            email: alumno.Email,
            permisoCambioImagenPerfil: alumno.PermisoCambioImagenPerfil,
            profesorId: alumno.profesorId,
            id: alumno.id
          };
          alumnosArreglados.push (alumnoArreglado);
        });
        obs.next (alumnosArreglados);

      });

    });
    return alumnosObservable;
  }
  */

  // GUARDAMOS LAS RESPUESTAS DE LOS ALUMNOS DEL CUESTIONARIO QUE HAYAN REALIZADO
  // tslint:disable-next-line:max-line-length
  public GuardarRespuestaAlumnoJuegoDeCuestionario(respuestaAlumnoJuegoDeCuestionario: RespuestaJuegoDeCuestionario): Observable<RespuestaJuegoDeCuestionario> {
    console.log ('estoy en api');
    console.log (respuestaAlumnoJuegoDeCuestionario);
    return this.http.post<RespuestaJuegoDeCuestionario>(this.APIUrlRespuestasJuegoDeCuestionario , respuestaAlumnoJuegoDeCuestionario);
  }

/*
  public GuardarRespuestaAlumnoJuegoDeCuestionario2(respuestaAlumnoJuegoDeCuestionario: RespuestaJuegoDeCuestionario) {
    return from(Http.post(this.APIUrlRespuestasJuegoDeCuestionario , respuestaAlumnoJuegoDeCuestionario));
  }
*/


  //??????????????????????

  public DameInscripcionAlumnoJuegoDeCuestionario(alumnoId: number, juegoDeCuestionarioId: number): Observable<AlumnoJuegoDeCuestionario> {
    const inscripcionObservable: Observable<AlumnoJuegoDeCuestionario> = new Observable((obs) => {
      this.http.get<any>(this.APIUrlAlumnoJuegoDeCuestionario + '?filter[where][alumnoId]=' + alumnoId
      + '&filter[where][juegoDeCuestionarioId]=' + juegoDeCuestionarioId)
      .subscribe (inscripcion => {
        const inscripcionArreglada = {
          nota: inscripcion.Nota,
          tiempoEmpleado: inscripcion.TiempoEmpleado,
          contestado: inscripcion.Contestado,
          id: inscripcion.id,
          alumnoId: inscripcion.alumnoId,
          juegoDeCuestionarioId: inscripcion.juegoDeCuestionarioId
        };
      
        obs.next (inscripcionArreglada);
      });
    });
    return inscripcionObservable;
  }


  /*
  public DameInscripcionAlumnoJuegoDeCuestionario(alumnoId: number, juegoDeCuestionarioId: number) {
    const options: HttpOptions = {url: this.APIUrlAlumnoJuegoDeCuestionario + '?filter[where][alumnoId]=' + alumnoId + '&filter[where][juegoDeCuestionarioId]=' + juegoDeCuestionarioId}
    const inscripcionObservable: Observable<AlumnoJuegoDeCuestionario> = new Observable((obs) => {
      from(Http.get(options))
      .subscribe (inscripcion => {
        const inscripcionArreglada = {
          nota: inscripcion.Nota,
          tiempoEmpleado: inscripcion.TiempoEmpleado,
          contestado: inscripcion.Contestado,
          id: inscripcion.id,
          alumnoId: inscripcion.alumnoId,
          juegoDeCuestionarioId: inscripcion.juegoDeCuestionarioId
        };
      
        obs.next (inscripcionArreglada);
      });
    });
    return inscripcionObservable;
  }
  */

  // Da la inscripción de un alumno concreto
  // ********************** */
  // tslint:disable-next-line:max-line-length
  public DameInscripcionAlumnoJuegoDeCuestionarioSatisfaccion(juegoId: number, alumnoId: number): Observable<AlumnoJuegoDeCuestionarioSatisfaccion> {
    const inscripcionObservable: Observable<AlumnoJuegoDeCuestionarioSatisfaccion> = new Observable((obs) => {
      this.http.get<any>(this.APIUrlAlumnoJuegoDeCuestionarioSatisfaccion
        + '?filter[where][juegoDeCuestionarioSatisfaccionId]=' + juegoId +  '&filter[where][alumnoId]=' + alumnoId)
      .subscribe (inscripcion => {
        const inscripcionArreglada = {
          contestado: inscripcion.Contestado,
          respuestasAfirmaciones: inscripcion.RespuestasAfirmaciones,
          respuestasPreguntasAbiertas: inscripcion.RespuestasPreguntasAbiertas,
          id: inscripcion.id,
          alumnoId: inscripcion.alumnoId,
          juegoDeCuestionarioSatisfaccionId: inscripcion.juegoDeCuestionarioSatisfaccionId
        };
        obs.next (inscripcionArreglada);
      });
    });
    return inscripcionObservable;
  }


/*
  public DameInscripcionAlumnoJuegoDeCuestionarioSatisfaccion2(juegoId: number, alumnoId: number) {
    const options: HttpOptions = {url: this.APIUrlAlumnoJuegoDeCuestionarioSatisfaccion + '?filter[where][juegoDeCuestionarioSatisfaccionId]=' + juegoId +  '&filter[where][alumnoId]=' + alumnoId}
    const inscripcionObservable: Observable<AlumnoJuegoDeCuestionarioSatisfaccion> = new Observable((obs) => {
      from(Http.get(options))
      .subscribe (inscripcion => {
        const inscripcionArreglada = {
          contestado: inscripcion.Contestado,
          respuestasAfirmaciones: inscripcion.RespuestasAfirmaciones,
          respuestasPreguntasAbiertas: inscripcion.RespuestasPreguntasAbiertas,
          id: inscripcion.id,
          alumnoId: inscripcion.alumnoId,
          juegoDeCuestionarioSatisfaccionId: inscripcion.juegoDeCuestionarioSatisfaccionId
        };
        obs.next (inscripcionArreglada);
      });
    });
    return inscripcionObservable;
  }
*/

  public DameAlumnosJuegoDeCuestionarioSatisfaccion(juegoId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrlAlumnoJuegoDeCuestionarioSatisfaccion + '/' + juegoId + '/alumnos');
  }

  /*
  public DameAlumnosJuegoDeCuestionarioSatisfaccion(juegoId: number){
    const options: HttpOptions = {url: this.APIUrlAlumnoJuegoDeCuestionarioSatisfaccion + '/' + juegoId + '/alumnos'}
    return from(Http.get(options));
  }
*/

  public DameCuestionarioSatisfaccion(cuestionarioId: number): Observable<CuestionarioSatisfaccion> {
    const cuestionarioSatisfaccionObservable: Observable<CuestionarioSatisfaccion> = new Observable((obs) => {
     this.http.get<any>(this.APIUrlCuestionarioSatisfaccion + '/' + cuestionarioId)
     .subscribe (cuestionarioSatisfaccion => {
       const cuestionarioArreglado = {
        titulo: cuestionarioSatisfaccion.Titulo ,
        descripcion: cuestionarioSatisfaccion.Descripcion ,
        afirmaciones: cuestionarioSatisfaccion.Afirmaciones ,
        preguntasAbiertas: cuestionarioSatisfaccion.PreguntasAbiertas,
        profesorId: cuestionarioSatisfaccion.profesorId,
        id: cuestionarioSatisfaccion.id,
       };
       obs.next (cuestionarioArreglado);
     });
    });
    return cuestionarioSatisfaccionObservable;
  }

/*
  public DameCuestionarioSatisfaccion(cuestionarioId: number){
    const options: HttpOptions = {url: this.APIUrlCuestionarioSatisfaccion + '/' + cuestionarioId}
    const cuestionarioSatisfaccionObservable: Observable<CuestionarioSatisfaccion> = new Observable((obs) => {
     from(Http.get(options))
     .subscribe (cuestionarioSatisfaccion => {
       const cuestionarioArreglado = {
        titulo: cuestionarioSatisfaccion.Titulo ,
        descripcion: cuestionarioSatisfaccion.Descripcion ,
        afirmaciones: cuestionarioSatisfaccion.Afirmaciones ,
        preguntasAbiertas: cuestionarioSatisfaccion.PreguntasAbiertas,
        profesorId: cuestionarioSatisfaccion.profesorId,
        id: cuestionarioSatisfaccion.id,
       };
       obs.next (cuestionarioArreglado);
     });
    });
    return cuestionarioSatisfaccionObservable;
  }
  */

  // tslint:disable-next-line:max-line-length
  public ModificaInscripcionAlumnoJuegoDeCuestionarioSatisfaccion(inscripcion: AlumnoJuegoDeCuestionarioSatisfaccion): Observable<AlumnoJuegoDeCuestionarioSatisfaccion> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<AlumnoJuegoDeCuestionarioSatisfaccion>(this.APIUrlAlumnoJuegoDeCuestionarioSatisfaccion + '/' + inscripcion.id, inscripcion);
  }
/*
  public ModificaInscripcionAlumnoJuegoDeCuestionarioSatisfaccion(inscripcion: AlumnoJuegoDeCuestionarioSatisfaccion) {
    // tslint:disable-next-line:max-line-length
    return from(Http.put(this.APIUrlAlumnoJuegoDeCuestionarioSatisfaccion + '/' + inscripcion.id, inscripcion));
  }
  */

  public  DameJuegoDeVotacionRapida(clave: string): Observable<any> {
    const juegoObservable: Observable<any> = new Observable( obs => {
      this.http.get<any>(this.APIUrlJuegoDeVotacionRapida
        + '?filter[where][Clave]=' + clave)
      .subscribe (res => {
        let juegoArreglado;
        if (res.length === 0) {
          juegoArreglado = undefined;
        } else {
          const juego = res[0];
          juegoArreglado = {
            id: juego.id,
            nombreJuego: juego.NombreJuego,
            tipo: juego.Tipo,
            clave: juego.Clave,
            modoReparto: juego.ModoReparto,
            conceptos: juego.Conceptos,
            puntos: juego.Puntos,
            respuestas: juego.Respuestas,
            profesorId: juego.profesorId
          };
        }
        obs.next (juegoArreglado);
      });
    });
    return juegoObservable;
  }


  /*
  public  DameJuegoDeVotacionRapida(clave: string) {
    const options: HttpOptions = {url: this.APIUrlJuegoDeVotacionRapida + '?filter[where][Clave]=' + clave}
    const juegoObservable: Observable<any> = new Observable( obs => {
      from(Http.get(options))
      .subscribe (res => {
        let juegoArreglado;
        if (res == null) {
          juegoArreglado = undefined;
        } else {
          const juego = res[0];
          juegoArreglado = {
            id: juego.id,
            nombreJuego: juego.NombreJuego,
            tipo: juego.Tipo,
            clave: juego.Clave,
            modoReparto: juego.ModoReparto,
            conceptos: juego.Conceptos,
            puntos: juego.Puntos,
            respuestas: juego.Respuestas,
            profesorId: juego.profesorId
          };
        }
        obs.next (juegoArreglado);
      });
    });
    return juegoObservable;
  }
  */



  public ModificarJuegoVotacionRapida( juego: any): Observable<any> {
    const juegoArreglado = {
      id: juego.id,
      NombreJuego: juego.nombreJuego,
      Tipo: juego.tipo,
      Clave: juego.clave,
      modoReparto: juego.modoReparto,
      Conceptos: juego.conceptos,
      punto: juego.puntos,
      Respuestas: juego.respuestas,
      profesorId: juego.profesorId
    };

    // tslint:disable-next-line:max-line-length
    return this.http.put<any>(this.APIUrlJuegoDeVotacionRapida, juegoArreglado);
  }


  /*

  public ModificarJuegoVotacionRapida( juego: any) {
    const juegoArreglado = {
      id: juego.id,
      NombreJuego: juego.nombreJuego,
      Tipo: juego.tipo,
      Clave: juego.clave,
      modoReparto: juego.modoReparto,
      Conceptos: juego.conceptos,
      punto: juego.puntos,
      Respuestas: juego.respuestas,
      profesorId: juego.profesorId
    };

    // tslint:disable-next-line:max-line-length
    return from(Http.put(this.APIUrlJuegoDeVotacionRapida, juegoArreglado));
  }

  */



// public DameJuegoDeCuestionarioRapidoo (clave: string): Observable<any> {
//   return this.http.get<any>(this.APIUrlJuegoDeCuestionarioRapido
//   + '?filter[where][Clave]=' + clave);
// }



public  DameJuegoDeCuestionarioRapido(clave: string): Observable<any> {
  const juegoObservable: Observable<any> = new Observable( obs => {
    this.http.get<any>(this.APIUrlJuegoDeCuestionarioRapido
      + '?filter[where][Clave]=' + clave)
    .subscribe (res => {
      let juegoArreglado;
      if (res.length === 0) {
        juegoArreglado = undefined;
      } else {
        const juego = res[0];
        console.log ('este es el juego que ha llegado **^**' , juego);
        juegoArreglado = {
          id: juego.id,
          nombreJuego: juego.NombreJuego,
          tipo: juego.Tipo,
          clave: juego.Clave,
          profesorId: juego.profesorId,
          modalidad: juego.Modalidad,
          puntuacionCorrecta: juego.PuntuacionCorrecta,
          puntuacionIncorrecta: juego.PuntuacionIncorrecta,
          tiempoLimite: juego.TiempoLimite,
          juegoActivo: juego.JuegoActivo,
          juegoTerminado: juego.JuegoTerminado,
          respuestas: juego.Respuestas,
          cuestionarioId: juego.cuestionarioId,
          presentacion: juego.Presentacion

        };
      }
      obs.next (juegoArreglado);
    });
  });
  return juegoObservable;
}

/*
public  DameJuegoDeCuestionarioRapido(clave: string) {
  const options: HttpOptions = {url: this.APIUrlJuegoDeCuestionarioRapido + '?filter[where][Clave]=' + clave}
  const juegoObservable: Observable<any> = new Observable( obs => {
    from(Http.get(options))
    .subscribe (res => {
      let juegoArreglado;
      if (res == null) {
        juegoArreglado = undefined;
      } else {
        const juego = res[0];
        console.log ('este es el juego que ha llegado **^**' , juego);
        juegoArreglado = {
          id: juego.id,
          nombreJuego: juego.NombreJuego,
          tipo: juego.Tipo,
          clave: juego.Clave,
          profesorId: juego.profesorId,
          modalidad: juego.Modalidad,
          puntuacionCorrecta: juego.PuntuacionCorrecta,
          puntuacionIncorrecta: juego.PuntuacionIncorrecta,
          tiempoLimite: juego.TiempoLimite,
          juegoActivo: juego.JuegoActivo,
          juegoTerminado: juego.JuegoTerminado,
          respuestas: juego.Respuestas,
          cuestionarioId: juego.cuestionarioId,
          presentacion: juego.Presentacion

        };
      }
      obs.next (juegoArreglado);
    });
  });
  return juegoObservable;
}
*/





public ModificarJuegoDeCuestionarioRapidoo( juego: any): Observable<any> {
  // tslint:disable-next-line:max-line-length
    return this.http.put<any>(this.APIUrlJuegoDeCuestionarioRapido, juego);
}

/*
public ModificarJuegoDeCuestionarioRapidoo( juego: any) {
  // tslint:disable-next-line:max-line-length
    return from(Http.put(this.APIUrlJuegoDeCuestionarioRapido, juego));
}
*/

public ModificarJuegoDeCuestionarioRapido( juego: any): Observable<any> {
  const juegoArreglado = {
    id: juego.id,
    NombreJuego: juego.nombreJuego,
    Tipo: juego.tipo,
    Clave: juego.clave,
    profesorId: juego.profesorId,
    Modalidad: juego.modalidad,
    PuntuacionCorrecta: juego.puntuacionCorrecta,
    PuntuacionIncorrecta: juego.puntuacionIncorrecta,
    TiempoLimite: juego.tiempoLimite,
    JuegoActivo: juego.juegoActivo,
    JuegoTerminado: juego.juegoTerminado,
    Respuestas: juego.respuestas,
    cuestionarioId: juego.cuestionarioId,
    Presentacion: juego.presentacion
  };

  // tslint:disable-next-line:max-line-length
  return this.http.put<any>(this.APIUrlJuegoDeCuestionarioRapido, juegoArreglado);
}

/*
public ModificarJuegoDeCuestionarioRapido( juego: any) {
  const juegoArreglado = {
    id: juego.id,
    NombreJuego: juego.nombreJuego,
    Tipo: juego.tipo,
    Clave: juego.clave,
    profesorId: juego.profesorId,
    Modalidad: juego.modalidad,
    PuntuacionCorrecta: juego.puntuacionCorrecta,
    PuntuacionIncorrecta: juego.puntuacionIncorrecta,
    TiempoLimite: juego.tiempoLimite,
    JuegoActivo: juego.juegoActivo,
    JuegoTerminado: juego.juegoTerminado,
    Respuestas: juego.respuestas,
    cuestionarioId: juego.cuestionarioId,
    Presentacion: juego.presentacion
  };

  // tslint:disable-next-line:max-line-length
  return from(Http.put(this.APIUrlJuegoDeCuestionarioRapido, juegoArreglado));
}
*/


  public DameRespuestasAlumnoJuegoDeCuestionario(alumnoJuegoDeCuestionarioId: number): Observable<RespuestaJuegoDeCuestionario[]> {
    return this.http.get<RespuestaJuegoDeCuestionario[]>(this.APIUrlRespuestasJuegoDeCuestionario
      + '?filter[where][alumnoJuegoDeCuestionarioId]=' + alumnoJuegoDeCuestionarioId);
  }

/*
  public DameRespuestasAlumnoJuegoDeCuestionario(alumnoJuegoDeCuestionarioId: number) {
    const options: HttpOptions = {url: this.APIUrlRespuestasJuegoDeCuestionario + '?filter[where][alumnoJuegoDeCuestionarioId]=' + alumnoJuegoDeCuestionarioId}
    return from(Http.get(options));
  }
*/

  public DameInscripcionesAlumnoJuegoDeCuestionario(juegoDeCuestionarioId: number): Observable<AlumnoJuegoDeCuestionario[]> {
    return this.http.get<AlumnoJuegoDeCuestionario[]>(this.APIUrlAlumnoJuegoDeCuestionario
                                                      + '?filter[where][juegoDeCuestionarioId]=' + juegoDeCuestionarioId);
  }

  /*
  public DameInscripcionesAlumnoJuegoDeCuestionario(juegoDeCuestionarioId: number) {
    const options: HttpOptions = {url: this.APIUrlAlumnoJuegoDeCuestionario + '?filter[where][juegoDeCuestionarioId]=' + juegoDeCuestionarioId}
    return from(Http.get(options));
  }
  */

  // public DameJuegoDeEncuestaRapidaa(clave: string): Observable<any> {
  //   return this.http.get<any>(this.APIUrlJuegoDeEncuestaRapida
  //   + '?filter[where][Clave]=' + clave);
  // }

  
  public  DameJuegoDeEncuestaRapida(clave: string): Observable<any> {
    const juegoObservable: Observable<any> = new Observable( obs => {
      this.http.get<any>(this.APIUrlJuegoDeEncuestaRapida
        + '?filter[where][Clave]=' + clave)
      .subscribe (res => {
        let juegoArreglado;
        if (res.length === 0) {
          juegoArreglado = undefined;
        } else {
          const juego = res[0];
          console.log ('este es el juego que ha llegado **^**' , juego);
          juegoArreglado = {
            id: juego.id,
            nombreJuego: juego.NombreJuego,
            tipo: juego.Tipo,
            clave: juego.Clave,
            respuestas: juego.Respuestas,
            cuestionarioSatisfaccionId: juego.cuestionarioSatisfaccionId,
            profesorId: juego.profesorId
          };
        }
        obs.next (juegoArreglado);
      });
    });
    return juegoObservable;
  }


  /*
  public  DameJuegoDeEncuestaRapida(clave: string) {
    const options: HttpOptions = {url: this.APIUrlJuegoDeEncuestaRapida + '?filter[where][Clave]=' + clave}
    const juegoObservable: Observable<any> = new Observable( obs => {
      from(Http.get(options))
      .subscribe (res => {
        let juegoArreglado;
        if (res == null) {
          juegoArreglado = undefined;
        } else {
          const juego = res[0];
          console.log ('este es el juego que ha llegado **^**' , juego);
          juegoArreglado = {
            id: juego.id,
            nombreJuego: juego.NombreJuego,
            tipo: juego.Tipo,
            clave: juego.Clave,
            respuestas: juego.Respuestas,
            cuestionarioSatisfaccionId: juego.cuestionarioSatisfaccionId,
            profesorId: juego.profesorId
          };
        }
        obs.next (juegoArreglado);
      });
    });
    return juegoObservable;
  }

  */



  // public ModificarJuegoDeEncuestaRapidaa( juego: JuegoDeEncuestaRapida): Observable<JuegoDeEncuestaRapida> {
  //   // tslint:disable-next-line:max-line-length
  //     return this.http.put<JuegoDeEncuestaRapida>(this.APIUrlJuegoDeEncuestaRapida, juego);
  // }

  

  public ModificarJuegoDeEncuestaRapida( juego: JuegoDeEncuestaRapida): Observable<any> {
    const juegoArreglado = {
      id: juego.id,
      NombreJuego: juego.nombreJuego,
      Tipo: juego.tipo,
      Clave: juego.clave,
      cuestionarioSatisfaccionId: juego.cuestionarioSatisfaccionId,
      Respuestas: juego.respuestas,
      profesorId: juego.profesorId
    };

    // tslint:disable-next-line:max-line-length
    return this.http.put<JuegoDeEncuestaRapida>(this.APIUrlJuegoDeEncuestaRapida, juegoArreglado);
  }

  /*
  public ModificarJuegoDeEncuestaRapida( juego: JuegoDeEncuestaRapida) {
    const juegoArreglado = {
      id: juego.id,
      NombreJuego: juego.nombreJuego,
      Tipo: juego.tipo,
      Clave: juego.clave,
      cuestionarioSatisfaccionId: juego.cuestionarioSatisfaccionId,
      Respuestas: juego.respuestas,
      profesorId: juego.profesorId
    };

    // tslint:disable-next-line:max-line-length
    return from(Http.put(this.APIUrlJuegoDeEncuestaRapida, juegoArreglado));
  }
*/
}
