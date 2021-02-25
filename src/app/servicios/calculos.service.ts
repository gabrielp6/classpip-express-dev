import { Injectable } from '@angular/core';
import { Alumno, TablaAlumnoJuegoDeCuestionario } from '../clases/index';
import { AlumnoJuegoDeCuestionario } from '../clases/AlumnoJuegoDeCuestionario';

@Injectable({
  providedIn: 'root'
})
export class CalculosService {

  constructor() {
  }

  public PrepararTablaRankingCuestionario(listaAlumnosOrdenadaPorPuntos: AlumnoJuegoDeCuestionario[],
                                          alumnosDelJuego: Alumno[]): TablaAlumnoJuegoDeCuestionario[] {
      const rankingJuegoDeCompeticion: TablaAlumnoJuegoDeCuestionario [] = [];
      // tslint:disable-next-line:prefer-for-oF
      for (let i = 0; i < listaAlumnosOrdenadaPorPuntos.length; i++) {
        let alumno: Alumno;
        const alumnoId = listaAlumnosOrdenadaPorPuntos[i].alumnoId;
        alumno = alumnosDelJuego.filter(res => res.id === alumnoId)[0];
        // tslint:disable-next-line:max-line-length
        rankingJuegoDeCompeticion[i] = new TablaAlumnoJuegoDeCuestionario(alumno.Nombre, alumno.PrimerApellido, alumno.SegundoApellido, alumno.ImagenPerfil,
        // tslint:disable-next-line:max-line-length
        listaAlumnosOrdenadaPorPuntos[i].Nota, listaAlumnosOrdenadaPorPuntos[i].Contestado, alumnoId, listaAlumnosOrdenadaPorPuntos[i].TiempoEmpleado);
        console.log ('nueva tabla');
        console.log (rankingJuegoDeCompeticion[i]);
      }
      return rankingJuegoDeCompeticion;
  }

}

