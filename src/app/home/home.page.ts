import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, AngularDelegate } from '@ionic/angular';
import { PeticionesAPIService, SesionService, ComServerService} from '../servicios/index';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {
  clave: string;
  nickname: string;

  constructor(
    public navCtrl: NavController,
    private peticionesAPI: PeticionesAPIService,
    private sesion: SesionService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private comServer: ComServerService)  { }

    async AutentificarJuegoRapido() {
        console.log ('Juego rapido ' + this.clave + ' ' + this.nickname);
        console.log ('voy a por el juego de encuesta rapida');
        this.peticionesAPI.DameJuegoDeEncuestaRapida (this.clave)
        .subscribe (async juego => {
          console.log ('este es el juego que ha llegado ', juego);
          if (juego !== undefined) {
            console.log ('Ya tengo el juego de encuesta rapida');
            console.log (juego);
            this.sesion.TomaJuego(juego);
            this.sesion.TomaNickName (this.nickname);
            this.comServer.EnviarNick (juego.profesorId, this.nickname);
            this.comServer.EsperoConfirmacionNickValido ()
            .subscribe ( async respuesta => {
              if (respuesta === 'nick usado') {
                const alert = await this.alertController.create({
                  header: 'Error',
                  // subHeader: 'Subtitle',
                  message: 'Este nick ya ha sido elegido por otro jugador',
                  buttons: ['OK']
                });
                await alert.present();
              } else {
                this.navCtrl.navigateForward('/juego-cuestionario-satisfaccion');
              }
            });
          } else {
            console.log ('voy a por el juego de votación rapida');
            this.peticionesAPI.DameJuegoDeVotacionRapida (this.clave)
            .subscribe (juego => {
              console.log ('este es el juego que ha llegado ', juego);
              if (juego !== undefined) {
                console.log ('Ya tengo el juego de votacion rapida');
                console.log (juego);
                this.sesion.TomaJuego(juego);
                this.sesion.TomaNickName (this.nickname);
                this.comServer.EnviarNick (juego.profesorId, this.nickname);
                this.comServer.EsperoConfirmacionNickValido ()
                .subscribe ( async respuesta => {
                  if (respuesta === 'nick usado') {
                    const alert = await this.alertController.create({
                      header: 'Error',
                      // subHeader: 'Subtitle',
                      message: 'Este nick ya ha sido elegido por otro jugador',
                      buttons: ['OK']
                    });
                    await alert.present();
                  } else {
                    this.navCtrl.navigateForward('/juego-votacion-rapida');
                  }
                });
              } else {
                console.log ('voy a por el juego de cuestionario rapido');
                this.peticionesAPI.DameJuegoDeCuestionarioRapido (this.clave)
                .subscribe (juego => {
                  console.log ('este es el juego que ha llegado ', juego);
                  if (juego !== undefined) {
                    console.log ('Ya tengo el juego');
                    console.log (juego);
                    this.sesion.TomaJuego(juego);
                    this.sesion.TomaNickName (this.nickname);
                    if (juego.modalidad === 'Clásico') {
                      this.comServer.EnviarNick (juego.profesorId, this.nickname);
                    } else {
                      this.comServer.EnviarNickYRegistrar (juego.profesorId, this.nickname, this.clave);
                    }
                    this.comServer.EsperoConfirmacionNickValido ()
                    .subscribe ( async respuesta => {
                      if (respuesta === 'nick usado') {
                        const alert = await this.alertController.create({
                          header: 'Error',
                          // subHeader: 'Subtitle',
                          message: 'Este nick ya ha sido elegido por otro jugador',
                          buttons: ['OK']
                        });
                        await alert.present();
                      } else {
                        this.navCtrl.navigateForward('/juego-de-cuestionario');
                      }
                    });
                  } else {
                    console.log ('voy a por el juego de coger turno rapido');
                    this.peticionesAPI.DameJuegoDeCogerTurnoRapido (this.clave)
                    .subscribe ( async juego => {
                      console.log ('este es el juego que ha llegado ', juego);
                      if (juego !== undefined) {
                        console.log ('Ya tengo el juego');
                        console.log (juego);
                        this.sesion.TomaJuego(juego);
                        this.sesion.TomaNickName (this.nickname);
                        // hay que enviar la clave también para poder recibir notificaciones
                        this.comServer.EnviarNickYRegistrar (juego.profesorId, this.nickname, this.clave);
                        this.comServer.EsperoConfirmacionNickValido ()
                        .subscribe ( async respuesta => {
                          if (respuesta === 'nick usado') {
                            const alert = await this.alertController.create({
                              header: 'Error',
                              // subHeader: 'Subtitle',
                              message: 'Este nick ya ha sido elegido por otro jugador',
                              buttons: ['OK']
                            });
                            await alert.present();
                          } else {
                            this.clave = undefined;
                            this.nickname = undefined;
                            this.navCtrl.navigateForward('/juego-coger-turno-rapido');
                          }
                        });
                      } else {
                        const alert = await this.alertController.create({
                          header: 'Error',
                          // subHeader: 'Subtitle',
                          message: 'No existe ningun juego rápido con esa clave',
                          buttons: ['OK']
                        });
                        await alert.present();
                        this.clave = undefined;
                        this.nickname = undefined;
                      }
                    });
                  }
                });
              }
            });
          }
        });
    }
}



