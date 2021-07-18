export class MiAlumnoAMostrarJuegoDeCuestionario {

    nota: number;
    alumnoId: number;
    juegoDeCuestionarioId: number;
    id: number;
    nombre: string;
    primerApellido: string;
    imagenPerfil: string;
  
    constructor(alumnoId?: number, juegoDeCuestionarioId?: number, Nota?: number,
                Nombre?: string, PrimerApellido?: string, ImagenPerfil?: string) {
  
      this.alumnoId = alumnoId;
      this.juegoDeCuestionarioId = juegoDeCuestionarioId;
      this.nota = Nota;
      this.nombre = Nombre;
      this.primerApellido = PrimerApellido;
      this.imagenPerfil = ImagenPerfil;
  
    }
  }