import { Component, OnInit } from '@angular/core';
import { PeticionesAPIService, SesionService } from '../servicios/index';
import { ComServerService } from '../servicios';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juego-votacion-rapida',
  templateUrl: './juego-votacion-rapida.page.html',
  styleUrls: ['./juego-votacion-rapida.page.scss'],
})
export class JuegoVotacionRapidaPage implements OnInit {


  juegoSeleccionado: any;
  nickName: string;
  conceptosConPuntos: any[];
  misVotos: any[];
  puntosARepartir: number;
  haVotado = false;


  

  constructor(
    public navCtrl: NavController,
    private sesion: SesionService,
    private peticionesAPI: PeticionesAPIService,
    private alertCtrl: AlertController,
    private comServer: ComServerService,
    private route: Router,
  ) { }

  ngOnInit() {
    this.juegoSeleccionado = this.sesion.DameJuego();
    this.puntosARepartir = this.juegoSeleccionado.puntos[0];
    this.nickName = this.sesion.DameNickName();
    if (this.juegoSeleccionado.modoReparto === 'Reparto libre') {
      console.log ('reparto libre');
      this.conceptosConPuntos = [];
      this.juegoSeleccionado.conceptos.forEach (concepto =>
        this.conceptosConPuntos.push ({
          c: concepto,
          puntos: 0
        })
      );
    }
  }




   // Esta función se ejecuta cuando movemos a los conceptos de sitio
   reorderItems(event) {
    const itemMove = this.juegoSeleccionado.conceptos.splice(event.detail.from, 1)[0];
    this.juegoSeleccionado.conceptos.splice(event.detail.to, 0, itemMove);
    event.detail.complete();
 }

 Incrementar(i) {
  if (this.puntosARepartir > 0) {
    this.conceptosConPuntos[i].puntos++;
    this.puntosARepartir--;
  }
}
Decrementar(i) {
  if ( this.conceptosConPuntos[i].puntos > 0) {
    this.conceptosConPuntos[i].puntos--;
    this.puntosARepartir++;
  }
}

 
 async EnviarVotacion() {
  console.log ('voy a enviar la votacion');
  this.misVotos = [];
  if (this.juegoSeleccionado.modoReparto !== 'Reparto libre') {
    for (let i = 0; i < this.juegoSeleccionado.puntos.length; i++) {
      this.misVotos.push ({
        c: this.juegoSeleccionado.conceptos[i],
        puntos: this.juegoSeleccionado.puntos[i]
      });
    }
  } else {
    this.misVotos = this.conceptosConPuntos;
  }

  this.comServer.Emitir ('respuestaVotacionRapida',
    { nick: this.nickName,
      votos: this.misVotos
    }
  );
  const confirm = await this.alertCtrl.create({
    header: 'Votacion enviada con éxito',
    message: 'Gracias por participar',
    buttons: [
        {
        text: 'OK',
        role: 'cancel',
        handler: () => {
        }
      }
    ]
  });
  await confirm.present();
  // tslint:disable-next-line:only-arrow-functions
  this.misVotos = this.misVotos.sort(function(a, b) {
    return b.puntos - a.puntos;
  });
  this.haVotado = true;

  // Ahora voy a guardar la votación en el juego para que no se pierde si el dash no
  // está ahora esperando votaciones.
  // Pero primero tengo que traer de nuevo el juego por si ha habido otras votaciones 
  // desde que lo traje al inicio
  this.peticionesAPI.DameJuegoDeVotacionRapida (this.juegoSeleccionado.clave)
  .subscribe (juego => {
    juego.respuestas.push (
      { nick: this.nickName,
      votos: this.misVotos
    });
    this.peticionesAPI.ModificarJuegoVotacionRapida (juego).subscribe();
  });
}

Cerrar() {
  this.comServer.DesconectarJuegoRapido();
  this.route.navigateByUrl('/home');
}


}
