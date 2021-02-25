import { Injectable } from '@angular/core';
import { Alumno, Juego } from '../clases';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  alumno: Alumno;
  juego: Juego;
  alumnoObservable = new ReplaySubject(1);
  nickName;

  constructor() { }
  
  public DameAlumno(): Alumno {
    return this.alumno;
  }
  public TomaNickName(nick: string) {
    this.nickName = nick;
  }

  public DameNickName(): string {
    return this.nickName;
  }

  public TomaJuego(juego: Juego) {
    this.juego = juego;
  }

  public DameJuego(): Juego {
    return this.juego;
  }
  public EnviameAlumno(): any {
    return this.alumnoObservable;
  }

  public TomaAlumno(alumno: Alumno) {
    this.alumno = alumno;
    this.alumnoObservable.next(alumno);
  }
}


