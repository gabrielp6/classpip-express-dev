import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
  ) { }


  public DameJuegoDeCogerTurnoRapido(clave: string): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrlJuegoDeCogerTurnoRapido
    + '?filter[where][clave]=' + clave);
  }

  //OBTENEMOS DATOS DEL CUESTIONARIO SELECCIONADO
  public DameCuestionario(cuestionarioId: number):Observable<Cuestionario> {
    return this.http.get<Cuestionario>(this.APIUrlCuestionario+ '/' + cuestionarioId);
  }

  //OBTENEMOS LAS PREGUNTAS DEL CUESTIONARIO SELECCIONADO
  public DamePreguntasCuestionario(cuestionarioId: number): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(this.APIUrlCuestionario + '/' + cuestionarioId + '/Preguntas');
  }

  //ESTABLECE LA NOTA OBTENIDA POR EL ALUMNO EN EL CUESTIONARIO
  public PonerNotaAlumnoJuegoDeCuestionario(alumnoJuegoDeCuestionario: AlumnoJuegoDeCuestionario, alumnoJuegoDeCuestionarioId: number): Observable<AlumnoJuegoDeCuestionario> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<AlumnoJuegoDeCuestionario>(this.APIUrlAlumnoJuegoDeCuestionario + '/' + alumnoJuegoDeCuestionarioId, alumnoJuegoDeCuestionario);
  }

  public DameAlumnosJuegoDeCuestionario(juegoDeCuestionarioId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrlJuegoDeCuestionario + '/' + juegoDeCuestionarioId + '/alumnos');
  }

  // GUARDAMOS LAS RESPUESTAS DE LOS ALUMNOS DEL CUESTIONARIO QUE HAYAN REALIZADO
  // tslint:disable-next-line:max-line-length
  public GuardarRespuestaAlumnoJuegoDeCuestionario(respuestaAlumnoJuegoDeCuestionario: RespuestaJuegoDeCuestionario): Observable<RespuestaJuegoDeCuestionario> {
    console.log ('estoy en api');
    console.log (respuestaAlumnoJuegoDeCuestionario);
    return this.http.post<RespuestaJuegoDeCuestionario>(this.APIUrlRespuestasJuegoDeCuestionario , respuestaAlumnoJuegoDeCuestionario);
  }

  public DameInscripcionAlumnoJuegoDeCuestionario(alumnoId: number, juegoDeCuestionarioId: number): Observable<AlumnoJuegoDeCuestionario> {
    return this.http.get<AlumnoJuegoDeCuestionario>(this.APIUrlAlumnoJuegoDeCuestionario + '?filter[where][alumnoId]=' + alumnoId
    + '&filter[where][juegoDeCuestionarioId]=' + juegoDeCuestionarioId);
  }

  // Da la inscripción de un alumno concreto
  // tslint:disable-next-line:max-line-length
  public DameInscripcionAlumnoJuegoDeCuestionarioSatisfaccion(juegoId: number, alumnoId: number): Observable<AlumnoJuegoDeCuestionarioSatisfaccion[]> {
    return this.http.get<AlumnoJuegoDeCuestionarioSatisfaccion[]>(this.APIUrlAlumnoJuegoDeCuestionarioSatisfaccion
    + '?filter[where][juegoDeCuestionarioSatisfaccionId]=' + juegoId +  '&filter[where][alumnoId]=' + alumnoId);
  }

  public DameAlumnosJuegoDeCuestionarioSatisfaccion(juegoId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrlAlumnoJuegoDeCuestionarioSatisfaccion + '/' + juegoId + '/alumnos');
  }

  public DameCuestionarioSatisfaccion(cuestionarioId: number): Observable<CuestionarioSatisfaccion> {
    return this.http.get<CuestionarioSatisfaccion>(this.APIUrlCuestionarioSatisfaccion + '/' + cuestionarioId);
  }

  // tslint:disable-next-line:max-line-length
  public ModificaInscripcionAlumnoJuegoDeCuestionarioSatisfaccion(inscripcion: AlumnoJuegoDeCuestionarioSatisfaccion): Observable<AlumnoJuegoDeCuestionarioSatisfaccion> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<AlumnoJuegoDeCuestionarioSatisfaccion>(this.APIUrlAlumnoJuegoDeCuestionarioSatisfaccion + '/' + inscripcion.id, inscripcion);
  }

  public DameJuegoDeVotacionRapida(clave: string): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrlJuegoDeVotacionRapida
    + '?filter[where][clave]=' + clave);
  }
  public ModificarJuegoVotacionRapida( juego: any): Observable<any> {
    // tslint:disable-next-line:max-line-length
      return this.http.put<any>(this.APIUrlJuegoDeVotacionRapida, juego);
  }


public DameJuegoDeCuestionarioRapido(clave: string): Observable<any[]> {
  return this.http.get<any[]>(this.APIUrlJuegoDeCuestionarioRapido
  + '?filter[where][clave]=' + clave);
}
public ModificarJuegoDeCuestionarioRapido( juego: any): Observable<any> {
  // tslint:disable-next-line:max-line-length
    return this.http.put<any>(this.APIUrlJuegoDeCuestionarioRapido, juego);
}

  public DameRespuestasAlumnoJuegoDeCuestionario(alumnoJuegoDeCuestionarioId: number): Observable<RespuestaJuegoDeCuestionario[]> {
    return this.http.get<RespuestaJuegoDeCuestionario[]>(this.APIUrlRespuestasJuegoDeCuestionario
      + '?filter[where][alumnoJuegoDeCuestionarioId]=' + alumnoJuegoDeCuestionarioId);
  }

  public DameInscripcionesAlumnoJuegoDeCuestionario(juegoDeCuestionarioId: number): Observable<AlumnoJuegoDeCuestionario[]> {
    return this.http.get<AlumnoJuegoDeCuestionario[]>(this.APIUrlAlumnoJuegoDeCuestionario
                                                      + '?filter[where][juegoDeCuestionarioId]=' + juegoDeCuestionarioId);
  }

  public DameJuegoDeEncuestaRapida(clave: string): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrlJuegoDeEncuestaRapida
    + '?filter[where][clave]=' + clave);
  }


  public ModificarJuegoDeEncuestaRapida( juego: JuegoDeEncuestaRapida): Observable<JuegoDeEncuestaRapida> {
    // tslint:disable-next-line:max-line-length
      return this.http.put<JuegoDeEncuestaRapida>(this.APIUrlJuegoDeEncuestaRapida, juego);
    }
}
